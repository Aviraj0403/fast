"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    const handleWebVitals = () => {
      if (typeof window !== "undefined" && window.webVitals) {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;

        // Proper type narrowing for the metric argument
        function sendToGoogleAnalytics(metric: { name: string; delta: number; id: string }) {
          window.gtag?.("event", metric.name, {
            event_category: "Web Vitals",
            value: Math.round(metric.name === "CLS" ? metric.delta * 1000 : metric.delta),
            event_label: metric.id,
            non_interaction: true,
          });
        }

        // Call the web vitals functions and send data to Google Analytics
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
