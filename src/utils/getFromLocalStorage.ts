export default function getFromLocalStorage(key: string): string {
  const value = localStorage.getItem(key);
  if(value) {
    return value;
  }
  throw new Error(`${key} does not have value or does not exits in local storage`);
}