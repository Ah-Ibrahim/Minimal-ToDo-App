import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const updateHandler = () => setMatches(media.matches);

    media.addEventListener('change', updateHandler);

    return () => media.removeEventListener('change', updateHandler);
  }, [query]);

  return matches;
}
export default useMediaQuery;
