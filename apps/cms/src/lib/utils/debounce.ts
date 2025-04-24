/**
 * Creates a debounced version of a function that delays execution until after a specified wait time.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to wait before executing the function.
 * @returns A debounced function with a `cancel` method to clear the pending timeout.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
      timeout = null; // Clear timeout after execution
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced as typeof debounced & { cancel: () => void };
}
