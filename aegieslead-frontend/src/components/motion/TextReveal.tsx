import React, { useRef, useState, useEffect } from 'react';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  staggerDelay?: number; // ms per word
}

export const TextReveal: React.FC<Props> = ({
  text,
  as: Component = 'h2',
  className = '',
  staggerDelay = 30
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Component ref={ref as any} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <span
            className="inline-block transition-transform duration-500 will-change-transform"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(110%)',
              transitionDelay: `${idx * staggerDelay}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
