export const debounce = (delay: number, fn: () => void) => {
  let timerId: NodeJS.Timeout | null;
  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn();
      timerId = null;
    }, delay);
  };
};
