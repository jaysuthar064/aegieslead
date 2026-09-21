import React, { useRef, useState, useEffect } from 'react';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  staggerDelay?: number;
}

export const TextReveal: React.FC<Props> = ({
  text,
  as: Component = 'h2',
  className = '',
  staggerDelay = 40
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
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Split by words for semantic wrapping, but animate gracefully
  const words = text.split(' ');

  return (
    <Component ref={ref as any} className={`flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden mr-[0.25em] py-1">
          <span
            className="inline-block transition-transform duration-1000 will-change-transform ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(110%)',
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
