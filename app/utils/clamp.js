export const clamp = (number, min, max) => {
  if (max === undefined) {
    return Math.max(number, min);
  }
  return Math.min(Math.max(number, min), max);
};
