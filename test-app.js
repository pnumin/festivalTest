// src/App.tsx
import { useEffect, useState } from "react";
import { Loader2, MapPin, Calendar, ExternalLink, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { jsx, jsxs } from "react/jsx-runtime";
var API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || import.meta.env?.VITE_GOOGLE_MAPS_PLATFORM_KEY || globalThis.GOOGLE_MAPS_PLATFORM_KEY || "";
var hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY";
function App() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(null);
  useEffect(() => {
    async function fetchFestivals() {
      try {
        const res = await fetch("/api/festivals");
        if (!res.ok) {
          throw new Error("Failed to fetch festivals from server");
        }
        const data = await res.json();
        if (data?.getFestivalKr?.item) {
          setFestivals(data.getFestivalKr.item);
        } else {
          setFestivals([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchFestivals();
  }, []);
  if (!hasValidKey) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-indigo-50 flex items-center justify-center p-4 font-sans text-slate-900 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-indigo-100/50 max-w-lg w-full z-10 border border-indigo-50 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-pink-500" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-indigo-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 tracking-tight", children: "Google Maps API \uD0A4\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4 \u{1F5FA}\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-sm", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-slate-800 mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs", children: "1" }),
              " API \uD0A4 \uBC1C\uAE09\uBC1B\uAE30"
            ] }),
            /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2.5 text-slate-600 ml-2", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("a", { href: "https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais", target: "_blank", rel: "noopener noreferrer", className: "text-pink-600 font-bold hover:text-pink-700 underline decoration-pink-200 underline-offset-4 transition-colors", children: "Google Cloud Console" }),
                "\uC5D0 \uC811\uC18D\uD569\uB2C8\uB2E4."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "\uC0C8 \uD504\uB85C\uC81D\uD2B8 \uC0DD\uC131 \uBC0F \uACB0\uC81C \uC815\uBCF4\uB97C \uB4F1\uB85D\uD569\uB2C8\uB2E4.",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 ml-4", children: "(\uCC38\uACE0: \uAC1C\uBC1C/\uD14C\uC2A4\uD2B8\uC6A9 \uB9E4\uB2EC \uBB34\uB8CC \uC81C\uACF5\uB7C9\uC774 \uC788\uC2B5\uB2C8\uB2E4)" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Maps JavaScript API" }),
                "\uB97C \uD65C\uC131\uD654\uD569\uB2C8\uB2E4."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "\uC0AC\uC6A9\uC790 \uC778\uC99D \uC815\uBCF4 \uBA54\uB274\uC5D0\uC11C ",
                /* @__PURE__ */ jsx("strong", { children: "API \uD0A4" }),
                "\uB97C \uC0DD\uC131 \uBC0F \uBCF5\uC0AC\uD569\uB2C8\uB2E4."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-slate-800 mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs", children: "2" }),
              " AI Studio\uC5D0 \uD0A4 \uB4F1\uB85D\uD558\uAE30"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2.5 text-slate-700 bg-slate-50 p-5 rounded-2xl border border-indigo-50", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "\uC6B0\uCE21 \uC0C1\uB2E8\uC758 ",
                /* @__PURE__ */ jsx("strong", { children: "\uC124\uC815(Settings, \u2699\uFE0F \uC544\uC774\uCF58)" }),
                "\uC744 \uD074\uB9AD\uD569\uB2C8\uB2E4."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Secrets" }),
                " \uBA54\uB274\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "\uC774\uB984(Name) \uCE78\uC5D0 \uC815\uD655\uD788 ",
                /* @__PURE__ */ jsx("code", { className: "bg-indigo-100/50 text-indigo-700 px-1.5 py-0.5 rounded font-mono font-bold tracking-tight text-xs", children: "GOOGLE_MAPS_PLATFORM_KEY" }),
                " \uB97C \uC785\uB825\uD558\uACE0 ",
                /* @__PURE__ */ jsx("strong", { children: "Enter" }),
                " \uD0A4\uB97C \uB204\uB985\uB2C8\uB2E4."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "\uAC12(Value) \uCE78\uC5D0 \uBCF5\uC0AC\uD55C \uD0A4\uB97C \uBD99\uC5EC\uB123\uACE0 \uB2E4\uC2DC ",
                /* @__PURE__ */ jsx("strong", { children: "Enter" }),
                " \uD0A4\uB97C \uB204\uB985\uB2C8\uB2E4."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-indigo-500 font-bold pt-4 border-t border-indigo-50/50 mt-6 text-xs uppercase tracking-widest", children: "\uD0A4\uB97C \uC815\uC0C1\uC801\uC73C\uB85C \uB4F1\uB85D\uD558\uBA74 \uC9C0\uB3C4\uAC00 \uB098\uD0C0\uB0A9\uB2C8\uB2E4 \u2728" })
        ] })
      ] })
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-indigo-50 flex items-center justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 animate-spin text-indigo-600 z-10" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "z-10 flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-pink-600 font-black text-lg mb-2 uppercase tracking-wide", children: "Error loading data" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: error })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx(APIProvider, { apiKey: API_KEY, version: "weekly", children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-indigo-50 text-slate-900 font-sans relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -right-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" }),
    /* @__PURE__ */ jsx("header", { className: "bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20 h-20 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      selectedFestival && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedFestival(null),
          className: "p-2 hover:bg-indigo-100 rounded-full transition-colors text-indigo-700",
          "aria-label": "Back to list",
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl", children: "B" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600", children: "FESTIVAL BUSAN" })
    ] }) }) }),
    /* @__PURE__ */ jsx("main", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 relative z-10 w-full", children: selectedFestival ? /* @__PURE__ */ jsx(FestivalDetail, { festival: selectedFestival }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
      festivals.map((festival) => /* @__PURE__ */ jsx(
        FestivalCard,
        {
          festival,
          onClick: () => setSelectedFestival(festival)
        },
        festival.UC_SEQ
      )),
      festivals.length === 0 && /* @__PURE__ */ jsx("p", { className: "col-span-full text-center text-slate-500 py-12", children: "No festivals found." })
    ] }) })
  ] }) });
}
function FestivalCard({ festival, onClick }) {
  const cleanTitle = festival.MAIN_TITLE.replace(/\(.*\)/, "").trim();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick,
      className: "bg-white/70 rounded-2xl border border-indigo-100 hover:bg-white hover:border-indigo-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "aspect-video relative bg-slate-100 flex items-center justify-center overflow-hidden shrink-0", children: [
          festival.MAIN_IMG_THUMB ? /* @__PURE__ */ jsx(
            "img",
            {
              src: festival.MAIN_IMG_THUMB,
              alt: cleanTitle,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              referrerPolicy: "no-referrer"
            }
          ) : /* @__PURE__ */ jsx(ImageIcon, { className: "w-8 h-8 text-slate-300" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 bg-pink-500 text-white px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm", children: festival.GUGUN_NM })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-grow bg-white/50 group-hover:bg-transparent transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors text-slate-900", children: cleanTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 line-clamp-2 mb-4 flex-grow italic", children: festival.TITLE || festival.SUBTITLE }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs font-bold text-indigo-400 mt-auto uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-indigo-300" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: festival.USAGE_DAY_WEEK_AND_TIME || "TBA" })
          ] })
        ] })
      ]
    }
  );
}
function FestivalDetail({ festival }) {
  const [showMap, setShowMap] = useState(false);
  const cleanTitle = festival.MAIN_TITLE.replace(/\(.*\)/, "").trim();
  const hasLocation = Boolean(festival.LAT && festival.LNG);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-white overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxs("div", { className: "aspect-[21/9] relative bg-slate-200 shrink-0 overflow-hidden z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-indigo-500 -z-10", style: { backgroundImage: "radial-gradient(circle at 70% 30%, #ec4899, #3b82f6)" } }),
      festival.MAIN_IMG_NORMAL ? /* @__PURE__ */ jsx(
        "img",
        {
          src: festival.MAIN_IMG_NORMAL,
          alt: cleanTitle,
          className: "w-full h-full object-cover relative z-0",
          referrerPolicy: "no-referrer"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center relative z-10", children: /* @__PURE__ */ jsx(ImageIcon, { className: "w-12 h-12 text-slate-300" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-10 z-10 bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-3", children: /* @__PURE__ */ jsx("span", { className: "bg-pink-500 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", children: festival.GUGUN_NM }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black tracking-tight mb-2 text-slate-900", children: cleanTitle }),
      festival.SUBTITLE && /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-500 font-medium mb-8", children: festival.SUBTITLE }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 space-y-8", children: /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-widest text-slate-400 mb-3", children: "About the Event" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 leading-relaxed whitespace-pre-wrap", children: festival.ITEMCNTNTS })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-indigo-50 space-y-4", children: [
            festival.USAGE_DAY_WEEK_AND_TIME && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-indigo-900", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-indigo-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-indigo-400 uppercase tracking-widest", children: "When" }),
                /* @__PURE__ */ jsx("p", { className: "font-bold mt-0.5", children: festival.USAGE_DAY_WEEK_AND_TIME })
              ] })
            ] }),
            festival.MAIN_PLACE && /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex gap-3 text-indigo-900 ${hasLocation ? "cursor-pointer hover:bg-indigo-100/50 p-2 -m-2 rounded-lg transition-colors" : ""}`,
                onClick: () => {
                  if (hasLocation) setShowMap(!showMap);
                },
                title: hasLocation ? "Click to toggle map" : void 0,
                children: [
                  /* @__PURE__ */ jsx(MapPin, { className: `w-5 h-5 flex-shrink-0 ${hasLocation ? "text-pink-500" : "text-indigo-400"}` }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-indigo-400 uppercase tracking-widest", children: [
                      "Where ",
                      hasLocation && /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] text-pink-500 font-bold bg-pink-100 px-1.5 py-0.5 rounded-full normal-case tracking-normal", children: "MAP" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "font-bold mt-0.5", children: festival.MAIN_PLACE }),
                    festival.ADDR1 && /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-500 mt-0.5", children: festival.ADDR1 })
                  ] })
                ]
              }
            ),
            showMap && hasLocation && /* @__PURE__ */ jsx("div", { className: "w-full h-48 rounded-xl overflow-hidden shadow-inner border border-indigo-200 mt-2", children: /* @__PURE__ */ jsx(
              Map,
              {
                defaultCenter: { lat: Number(festival.LAT), lng: Number(festival.LNG) },
                defaultZoom: 15,
                mapId: "DEMO_MAP_ID",
                style: { width: "100%", height: "100%" },
                disableDefaultUI: true,
                children: /* @__PURE__ */ jsx(AdvancedMarker, { position: { lat: Number(festival.LAT), lng: Number(festival.LNG) }, children: /* @__PURE__ */ jsx(Pin, { background: "#ec4899", glyphColor: "#fff", borderColor: "#be185d" }) })
              }
            ) }),
            festival.USAGE_AMOUNT && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-indigo-900", children: [
              /* @__PURE__ */ jsx("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-indigo-400 font-bold text-sm", children: "\u20A9" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-indigo-400 uppercase tracking-widest", children: "Admission" }),
                /* @__PURE__ */ jsx("p", { className: "font-bold mt-0.5 whitespace-pre-wrap", children: festival.USAGE_AMOUNT })
              ] })
            ] })
          ] }),
          festival.HOMEPAGE_URL && /* @__PURE__ */ jsxs(
            "a",
            {
              href: festival.HOMEPAGE_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 mt-2 hover:bg-indigo-700 transition-colors",
              "aria-label": "Visit official website",
              children: [
                "Visit Website",
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  App as default
};
