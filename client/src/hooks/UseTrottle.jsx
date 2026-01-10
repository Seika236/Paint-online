import { useCallback, useRef } from "react";

export function UseThrottle({ cb, delay }) {
  const timer = useRef(null);

  const throttledFn = useCallback(
    (...args) => {
      if (timer.current) {
        return;
      }
      cb(...args);
      timer.current = setTimeout(() => {
        timer.current = null;
      }, [delay]);
    },
    [cb, delay],
  );

  return throttledFn;
}
