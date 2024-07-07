import { useState, useEffect } from 'react';

const useVisibility = (ref: React.RefObject<HTMLElement>, threshold: number = 0.6) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= threshold);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // Generate thresholds from 0 to 1
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

export default useVisibility;
