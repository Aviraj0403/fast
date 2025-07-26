// global.d.ts or window.d.ts
export {};

declare global {
  interface WebVitals {
    getCLS: (onReport: (metric: { name: string; delta: number; id: string }) => void) => void;
    getFID: (onReport: (metric: { name: string; delta: number; id: string }) => void) => void;
    getFCP: (onReport: (metric: { name: string; delta: number; id: string }) => void) => void;
    getLCP: (onReport: (metric: { name: string; delta: number; id: string }) => void) => void;
    getTTFB: (onReport: (metric: { name: string; delta: number; id: string }) => void) => void;
  }

  interface Window {
    webVitals?: WebVitals;
    gtag?: (...args: unknown[]) => void;
  }
}
