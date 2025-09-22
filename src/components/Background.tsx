import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { circlesGenerator } from '../utils/BackgroundUtils';
import type { Size } from '../types/BackgroundTypes';

function Background() {
  const isDesktop: boolean = useMediaQuery('(min-width: 64rem)');
  const containerRef = useRef(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const circles = circlesGenerator(isDesktop, size.width, size.height).map(
    (item) => (
      <div
        key={item.color}
        className="bg-circle"
        style={{
          backgroundColor: item.color,
          width: `${item.width}px`,
          left: `${item.position.x}%`,
          top: `${item.position.y}%`,
        }}
      ></div>
    ),
  );

  useEffect(() => {
    if (containerRef.current) {
      const rect = (
        containerRef.current as HTMLElement
      ).getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return (
    <div className="h-full overflow-hidden bg-[#1e1e1e]" ref={containerRef}>
      {circles}
    </div>
  );
}
export default Background;
