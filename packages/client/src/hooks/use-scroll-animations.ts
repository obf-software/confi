import { useEffect, useState } from 'react';

export interface ScrollAnimationState {
  scrollY: number;
  scrollProgress: number;
  isScrolling: boolean;
}

export function useScrollAnimation(): ScrollAnimationState {
  const [scrollState, setScrollState] = useState<ScrollAnimationState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolling: false,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / documentHeight, 1);

      setScrollState({
        scrollY,
        scrollProgress,
        isScrolling: true,
      });

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollState((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return scrollState;
}

export interface IntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionAnimation(options: IntersectionAnimationOptions = {}) {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        if (visible && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsVisible(visible);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref: setElementRef, isVisible };
}

export function useParallax(speed: number = 0.5) {
  const { scrollY } = useScrollAnimation();
  return scrollY * speed;
}
