import React from "react";

const setLocalStorageItem = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
}

const clearLocalStorageItem = (item, data) => {
  localStorage.setItem(item, null);
}

const getLocalStorageItem = (item) => {
  const rawItem = localStorage.getItem(item);
  if (rawItem) {
    try {
      return JSON.parse(rawItem);
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

// Based on https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export { setLocalStorageItem, clearLocalStorageItem, getLocalStorageItem, useStickyState };