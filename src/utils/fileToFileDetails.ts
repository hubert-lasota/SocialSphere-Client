import { FileDetails } from "../types/common.types";
import fileToBase64 from "./fileToBase64";

export default function fileToFileDetails(file: File): FileDetails {
  let base64Content: string = "";
  fileToBase64(file)
    .then((base64) => (base64Content = base64))
    .catch((err) => console.log("Error: ", err));

  return {name: file.name, type: file.type, content: base64Content};
}
