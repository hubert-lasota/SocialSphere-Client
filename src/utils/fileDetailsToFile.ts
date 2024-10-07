import { FileDetails } from "../types/common.types";

export default function fileDetailsToFile(fileDetails: FileDetails): File {
  const byteCharacters = atob(fileDetails.content);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: fileDetails.type });

  const file = new File([blob], fileDetails.name, {
    type: fileDetails.type,
  });

  return file;
}