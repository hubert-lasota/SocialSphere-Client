import useLocalStorage from "./useLocalStorage";

export default function useIsCurrentUser(userId: number) {
  const [currentUserId] = useLocalStorage("user_id", "");

  return userId === currentUserId;
}