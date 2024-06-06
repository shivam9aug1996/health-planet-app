export const debounce = (fn: any, delay: number) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const throttle = (fn: any, delay: number) => {
  let last = 0;
  return (...args: any) => {
    let now = new Date().getTime();
    if (now - last < delay) return;
    else {
      fn(...args);
      last = now;
    }
  };
};
