import { useEffect, useState } from 'react';

function readFromStorage(key, defaultValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => readFromStorage(key, defaultValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures (e.g. quota exceeded, storage disabled)
    }
  }, [key, value]);

  return [value, setValue];
}
