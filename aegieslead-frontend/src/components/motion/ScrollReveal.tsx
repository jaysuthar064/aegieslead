import React, { useRef, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'fade' | 'mask-up' | 'line-up' | 'none';
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<Props> = ({
  children,
  variant = 'fade',
  delay = 0,
  className = '',
  threshold = 0.1
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
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`
  };

  if (variant === 'none') {
    return <div className={className}>{children}</div>;
  }

  if (variant === 'mask-up') {
    return (
      <div 
        ref={ref} 
        className={`${className} ${isVisible ? 'animate-mask-up' : 'opacity-0'}`}
        style={baseStyle}
      >
        {children}
      </div>
    );
  }

  // Minimal fade
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${className}`}
      style={{
        ...baseStyle,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {children}
    </div>
  );
};
