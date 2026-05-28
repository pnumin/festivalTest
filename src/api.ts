import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const apiRouter = Router();

apiRouter.get("/festivals", async (req, res) => {
  try {
    // Load service key from environment variable safely, with fallback to provided key if missing during testing
    const serviceKey = process.env.FESTIVAL_API_KEY || "8qw7g%2FC%2BMGd2iRqEvb%2FEx0Sg3ZwAAsnS%2FQ7rRaU3l4UUYfNWgyAbYpNw541yy9pueEvoCcNwmCww8ss32BBWEA%3D%3D";
    
    const apiURL = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${serviceKey}&pageNo=1&numOfRows=100&resultType=json`;
    
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching festival data:", error);
    res.status(500).json({ error: "Failed to fetch festival data" });
  }
});

apiRouter.post("/itinerary", async (req, res) => {
  try {
    const { festivalName, location, dates, duration } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `당신은 여행 전문가입니다. 축제를 기반으로 최적화된 여행 일정을 작성해주세요:
- 축제 이름: ${festivalName}
- 축제 장소: ${location}
- 축제 기간: ${dates}
- 여행 기간: ${duration}

가이드라인:
1. 축제 관람을 중심으로 일정을 구성해주세요. 시간대별로 구체적으로 작성하세요 (예: 1일차 오전에 무엇을 할지, 오후에 무엇을 축제에서 할지).
2. 주변 관광지, 현지 맛집, 카페 등을 포함시켜주세요.
3. 교통편 팁이나 이동 방법도 간략히 넣어주세요.
4. 마크다운 형식으로 보기 좋게 정리해서 한국어로 대답해주세요.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ itinerary: response.text });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary.", details: error.message });
  }
});

export default apiRouter;
