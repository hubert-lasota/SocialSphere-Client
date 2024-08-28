export default function debounce(callback: (...args: any[]) => void, delay = 500) {
  let timeoutId: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
