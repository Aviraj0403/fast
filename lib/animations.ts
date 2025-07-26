declare global {
  interface Window {
    AOS: {
      init: (options: Record<string, unknown>) => void;
      refresh: () => void;
    };
  }
}

// Animation configurations for common elements
export const fadeUpAnimation = {
  'data-aos': 'fade-up',
  'data-aos-duration': '1000',
  'data-aos-once': 'true',
};

export const fadeLeftAnimation = {
  'data-aos': 'fade-left',
  'data-aos-duration': '1000',
  'data-aos-once': 'true',
};

export const fadeRightAnimation = {
  'data-aos': 'fade-right',
  'data-aos-duration': '1000',
  'data-aos-once': 'true',
};

export const zoomInAnimation = {
  'data-aos': 'zoom-in',
  'data-aos-duration': '1000',
  'data-aos-once': 'true',
};

// Add animation delay
export const withDelay = (
  animation: Record<string, string>,
  delay: number
): Record<string, string> => ({
  ...animation,
  'data-aos-delay': delay.toString(),
});

// Initialize AOS on component mount
export const initializeAOS = () => {
  if (typeof window !== 'undefined' && window.AOS) {
    window.AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }
};

// Refresh AOS to detect new elements
export const refreshAOS = () => {
  if (typeof window !== 'undefined' && window.AOS) {
    window.AOS.refresh();
  }
};

export default {
  fadeUp: fadeUpAnimation,
  fadeLeft: fadeLeftAnimation,
  fadeRight: fadeRightAnimation,
  zoomIn: zoomInAnimation,
  withDelay,
  init: initializeAOS,
  refresh: refreshAOS,
};
