import { useEffect } from "react";

// TODO: add optional ref argument to attach this to a local element, rather than the entire window
// TODO: add optional 'sequence' arguement to listen to multiple inputs and then call a handler
export const useKeydown = (events: { [key: string]: (e: KeyboardEvent) => void}) => {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key in events) {
        events[e.key](e);
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, []);
}
