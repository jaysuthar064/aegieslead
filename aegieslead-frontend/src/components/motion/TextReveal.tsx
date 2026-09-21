import React, { useRef, useState, useEffect } from 'react';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  staggerDelay?: number;
  useShine?: boolean;
}

export const TextReveal: React.FC<Props> = ({
  text,
  as: Component = 'h2',
  className = '',
  staggerDelay = 40,
  useShine = false,
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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  const shineClass = useShine ? 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 animate-text-shine' : '';

  return (
    <Component ref={ref as any} className={`flex flex-wrap ${className} ${shineClass}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden mr-[0.25em] py-1">
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transitionDelay: `${idx * staggerDelay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
