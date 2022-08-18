// https://youmightnotneed.com/lodash#debounce

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const debounce = (
  func: Function,
  delay: number,
  { leading }: { leading?: boolean } = {}
) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: any[]) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};
