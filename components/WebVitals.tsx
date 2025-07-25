"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    const handleWebVitals = () => {
      if (typeof window !== "undefined" && window.webVitals) {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;

        function sendToGoogleAnalytics({ name, delta, id }: { name: string; delta: number; id: string }) {
          window.gtag?.("event", name, {
            event_category: "Web Vitals",
            value: Math.round(name === "CLS" ? delta * 1000 : delta),
            event_label: id,
            non_interaction: true,
          });
        }

        getCLS(sendToGoogleAnalytics);
        getFID(sendToGoogleAnalytics);
        getFCP(sendToGoogleAnalytics);
        getLCP(sendToGoogleAnalytics);
        getTTFB(sendToGoogleAnalytics);
      }
    };

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/web-vitals@2.1.4/dist/web-vitals.iife.js";
    script.async = true;
    script.onload = handleWebVitals;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
