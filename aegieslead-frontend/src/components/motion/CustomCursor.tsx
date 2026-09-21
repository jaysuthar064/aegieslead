import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[data-cursor]') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('textarea')
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Smooth lerp for trailing outer ring
  useEffect(() => {
    let animX = trailingPos.x;
    let animY = trailingPos.y;

    const animateTrailing = () => {
      animX += (position.x - animX) * 0.18;
      animY += (position.y - animY) * 0.18;
      setTrailingPos({ x: animX, y: animY });
      requestRef.current = requestAnimationFrame(animateTrailing);
    };

    requestRef.current = requestAnimationFrame(animateTrailing);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300">
      {/* Precision Inner Dot */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-600 transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.7 : 1})`,
        }}
      />

      {/* Smooth Trailing Ambient Ring */}
      <div
        className={`fixed -ml-4 -mt-4 rounded-full border border-blue-600/40 backdrop-blur-[1px] transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-blue-600/10 border-blue-600 scale-110'
            : isClicking
            ? 'w-6 h-6 -ml-3 -mt-3 scale-90 border-blue-700'
            : 'w-8 h-8'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      />
    </div>
  );
};
