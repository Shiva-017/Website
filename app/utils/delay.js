/** Returns a promise that resolves after `ms` milliseconds. */
export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
