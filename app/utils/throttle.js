export function throttle(func, timeFrame) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
