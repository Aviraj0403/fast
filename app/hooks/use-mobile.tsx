import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Make sure window exists (this is client-side only)
    if (typeof window === "undefined") return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    if (mql.addEventListener) {
      mql.addEventListener("change", checkIsMobile);
    } else {
      mql.addListener(checkIsMobile);
    }

    checkIsMobile();

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkIsMobile);
      } else {
        mql.removeListener(checkIsMobile);
      }
    };
  }, []);

  // When rendering on the server, return false or null or whatever default you want
  return isMobile ?? false;
}
