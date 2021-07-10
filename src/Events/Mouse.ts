import { useEffect } from 'react';

export const useClick = (
  handler: (e: MouseEvent) => void,
) => {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      handler(e);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, []);
}
