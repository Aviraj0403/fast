declare interface WebVitals {
  getCLS: (onReport: (metric: any) => void) => void;
  getFID: (onReport: (metric: any) => void) => void;
  getFCP: (onReport: (metric: any) => void) => void;
  getLCP: (onReport: (metric: any) => void) => void;
  getTTFB: (onReport: (metric: any) => void) => void;
}

declare global {
  interface Window {
    webVitals?: WebVitals;
    gtag?: (...args: any[]) => void;
  }
}
