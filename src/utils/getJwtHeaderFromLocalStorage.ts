import getFromLocalStorage from "./getFromLocalStorage";

export default function getJwtHeaderFromLocalStorage(): [string, string] {
  const jwtValue = getFromLocalStorage("jwt");
  const finalJwtValue = jwtValue.substring(1, jwtValue.length-1);
  return ["Authorization", `Bearer ${finalJwtValue}`];
}
