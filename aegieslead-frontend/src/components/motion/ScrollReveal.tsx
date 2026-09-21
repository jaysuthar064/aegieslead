import React, { useRef, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'fade-up' | 'scale' | 'slide-left' | 'slide-right';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<Props> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.15
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransformStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (variant) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 28px, 0)',
        };
      case 'scale':
        return {
          opacity: 0,
          transform: 'scale(0.94)',
        };
      case 'slide-left':
        return {
          opacity: 0,
          transform: 'translate3d(-32px, 0, 0)',
        };
      case 'slide-right':
        return {
          opacity: 0,
          transform: 'translate3d(32px, 0, 0)',
        };
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 20px, 0)',
        };
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        ...getTransformStyles(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
