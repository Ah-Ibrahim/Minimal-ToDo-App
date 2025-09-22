import useMediaQuery from '../hooks/useMediaQuery';
import { circlesGenerator } from '../utils/BackgroundUtils';

function Background() {
  const isDesktop: boolean = useMediaQuery('(min-width: 64rem)');

  const circles = circlesGenerator(isDesktop).map((item) => (
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
  ));

  return <div className="h-full overflow-hidden bg-[#1e1e1e]">{circles}</div>;
}
export default Background;
