import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, value: unknown) {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(
        window.localStorage.getItem(key) || String(value)
      );
    } catch(error) {
        currentValue = value;
    }
    return currentValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorageValue))
  }, [key, localStorageValue])

  return [localStorageValue, setLocalStorageValue];
}
