import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue?: unknown) {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(window.localStorage.getItem(key) || String(initialValue || ""));
    } catch (error) {
      currentValue = initialValue;
    }
    return currentValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
