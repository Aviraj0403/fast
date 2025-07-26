// global.d.ts or window.d.ts
export {};

declare global {
  interface WebVitals {
    getCLS: (onReport: (metric: unknown) => void) => void;
    getFID: (onReport: (metric: unknown) => void) => void;
    getFCP: (onReport: (metric: unknown) => void) => void;
    getLCP: (onReport: (metric: unknown) => void) => void;
    getTTFB: (onReport: (metric: unknown) => void) => void;
  }

  interface Window {
    webVitals?: WebVitals;
    gtag?: (...args: unknown[]) => void;
  }
}
