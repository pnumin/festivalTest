import { useEffect, useState } from "react";
import { Loader2, MapPin, Calendar, ExternalLink, ArrowLeft, Image as ImageIcon, Sparkles, X, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { FestivalItem, FestivalAPIResponse } from "./types";

export default function App() {
  const [festivals, setFestivals] = useState<FestivalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/festivals");
        if (!res.ok) {
          throw new Error("Failed to fetch festivals from server");
        }
        const data: FestivalAPIResponse = await res.json();
        
        if (data?.getFestivalKr?.item) {
          setFestivals(data.getFestivalKr.item);
        } else {
          setFestivals([]);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 z-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="z-10 flex flex-col items-center">
          <p className="text-pink-600 font-black text-lg mb-2 uppercase tracking-wide">Error loading data</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 text-slate-900 font-sans relative overflow-x-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20 h-20 shrink-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedFestival && (
                <button 
                  onClick={() => setSelectedFestival(null)}
                  className="p-2 hover:bg-indigo-100 rounded-full transition-colors text-indigo-700"
                  aria-label="Back to list"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">B</div>
              <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                FESTIVAL BUSAN
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 relative z-10 w-full">
          {selectedFestival ? (
            <FestivalDetail festival={selectedFestival} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {festivals.map(festival => (
                <FestivalCard 
                  key={festival.UC_SEQ} 
                  festival={festival} 
                  onClick={() => setSelectedFestival(festival)} 
                />
              ))}
              {festivals.length === 0 && (
                <p className="col-span-full text-center text-slate-500 py-12">
                  No festivals found.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
  );
}

function FestivalCard({ festival, onClick }: { festival: FestivalItem, onClick: () => void, key?: React.Key }) {
  // Strip part of the MAIN_TITLE e.g. "부산바다축제(한,영, 중간,중번,일)" -> "부산바다축제"
  const cleanTitle = festival.MAIN_TITLE.replace(/\(.*\)/, "").trim();

  return (
    <div 
      onClick={onClick}
      className="bg-white/70 rounded-2xl border border-indigo-100 hover:bg-white hover:border-indigo-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
    >
      <div className="aspect-video relative bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
        {festival.MAIN_IMG_THUMB ? (
          <img 
            src={festival.MAIN_IMG_THUMB} 
            alt={cleanTitle} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-slate-300" />
        )}
        <div className="absolute top-3 left-3 bg-pink-500 text-white px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm">
          {festival.GUGUN_NM}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-white/50 group-hover:bg-transparent transition-colors">
        <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors text-slate-900">
          {cleanTitle}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow italic">
          {festival.TITLE || festival.SUBTITLE}
        </p>
        <div className="flex items-center text-xs font-bold text-indigo-400 mt-auto uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-indigo-300" />
          <span className="truncate">{festival.USAGE_DAY_WEEK_AND_TIME || "TBA"}</span>
        </div>
      </div>
    </div>
  );
}

function FestivalDetail({ festival }: { festival: FestivalItem }) {
  const cleanTitle = festival.MAIN_TITLE.replace(/\(.*\)/, "").trim();
  const hasLocation = Boolean(festival.LAT && festival.LNG);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [duration, setDuration] = useState("1박 2일");
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const handleGenerateItinerary = async () => {
    setGenerating(true);
    setItinerary(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          festivalName: cleanTitle,
          location: festival.MAIN_PLACE || festival.GUGUN_NM,
          dates: festival.USAGE_DAY_WEEK_AND_TIME || festival.USAGE_DAY,
          duration: duration,
        }),
      });
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);
      setItinerary("일정 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-white overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="aspect-[21/9] relative bg-slate-200 shrink-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-indigo-500 -z-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #ec4899, #3b82f6)' }}></div>
        {festival.MAIN_IMG_NORMAL ? (
          <img 
            src={festival.MAIN_IMG_NORMAL} 
            alt={cleanTitle} 
            className="w-full h-full object-cover relative z-0"
            referrerPolicy="no-referrer"
          />
        ) : (
           <div className="w-full h-full flex items-center justify-center relative z-10"><ImageIcon className="w-12 h-12 text-slate-300" /></div>
        )}
      </div>
      
      <div className="p-6 sm:p-10 z-10 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
            {festival.GUGUN_NM}
          </span>
        </div>
        
        <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900">
          {cleanTitle}
        </h2>
        
        {festival.SUBTITLE && (
          <p className="text-lg text-slate-500 font-medium mb-8">
            {festival.SUBTITLE}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">About the Event</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {festival.ITEMCNTNTS}
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-indigo-50 space-y-4">
              {festival.USAGE_DAY_WEEK_AND_TIME && (
                <div className="flex gap-3 text-indigo-900">
                  <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">When</p>
                    <p className="font-bold mt-0.5">{festival.USAGE_DAY_WEEK_AND_TIME}</p>
                  </div>
                </div>
              )}
              
              {festival.MAIN_PLACE && (
                <a 
                  className={`flex gap-3 text-indigo-900 ${hasLocation ? 'cursor-pointer hover:bg-indigo-100/50 p-2 -m-2 rounded-lg transition-colors group/map block' : 'block'}`}
                  href={hasLocation ? `https://map.kakao.com/link/map/${encodeURIComponent(festival.MAIN_PLACE)},${festival.LAT},${festival.LNG}` : undefined}
                  target={hasLocation ? "_blank" : undefined}
                  rel={hasLocation ? "noopener noreferrer" : undefined}
                  title={hasLocation ? "View on Kakao Map" : undefined}
                >
                  <MapPin className={`w-5 h-5 flex-shrink-0 ${hasLocation ? 'text-pink-500 group-hover/map:scale-110 transition-transform' : 'text-indigo-400'}`} />
                  <div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      Where {hasLocation && <span className="ml-1 text-[10px] text-pink-500 font-bold bg-pink-100 px-1.5 py-0.5 rounded-full normal-case tracking-normal">KAKAO MAP</span>}
                    </p>
                    <p className="font-bold mt-0.5">{festival.MAIN_PLACE}</p>
                    {festival.ADDR1 && <p className="text-sm text-indigo-500 mt-0.5">{festival.ADDR1}</p>}
                  </div>
                </a>
              )}

              {festival.USAGE_AMOUNT && (
                <div className="flex gap-3 text-indigo-900">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-400 font-bold text-sm">₩</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Admission</p>
                    <p className="font-bold mt-0.5 whitespace-pre-wrap">{festival.USAGE_AMOUNT}</p>
                  </div>
                </div>
              )}
            </div>

            {festival.HOMEPAGE_URL && (
              <a 
                href={festival.HOMEPAGE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 mt-2 hover:bg-indigo-700 transition-colors"
                aria-label="Visit official website"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => setShowItineraryModal(true)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-200 mt-2 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-5 h-5" />
              여행일정 짜기 (AI)
            </button>
          </div>
        </div>
      </div>

      {showItineraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <h3 className="text-lg font-black text-indigo-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                AI 맞춤 여행일정
              </h3>
              <button 
                onClick={() => setShowItineraryModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {!itinerary && !generating ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-pink-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{cleanTitle}</h4>
                    <p className="text-slate-500 text-sm">축제 장소 주변의 최적화된 여행 코스를 AI가 바로 짜드립니다.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-4 h-4" /> 
                      여행 기간 선택
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["당일치기", "1박 2일", "2박 3일", "3박 4일"].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${duration === d ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGenerateItinerary}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity"
                  >
                    일정 생성하기
                  </button>
                </div>
              ) : generating ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
                  <div className="text-center space-y-2">
                    <h4 className="text-lg font-bold text-slate-900 animate-pulse">AI가 최적의 코스를 계획 중입니다...</h4>
                    <p className="text-sm text-slate-500">맛집, 카페, 주변 관광지를 검색하고 있어요.</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-slate prose-indigo max-w-none text-sm leading-relaxed prose-headings:font-bold prose-h3:text-indigo-900 prose-a:text-pink-600 text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {itinerary}
                  </ReactMarkdown>
                  
                  <button
                    onClick={() => { setItinerary(null); }}
                    className="w-full mt-10 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    다시 만들기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
