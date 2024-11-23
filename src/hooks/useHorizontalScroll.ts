import { useEffect, RefObject } from 'react';

export const useHorizontalScroll = (scrollRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = scrollRef.current;
    
    const onWheel = (e: WheelEvent) => {
      if (!element) return;
      
      e.preventDefault();
      
      element.scrollTo({
        left: element.scrollLeft + (e.deltaY * 2),
        behavior: 'smooth'
      });
    };

    const currentElement = element;
    if (currentElement) {
      currentElement.addEventListener('wheel', onWheel, { passive: false });
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener('wheel', onWheel);
      }
    };
  }, [scrollRef]);
}; 