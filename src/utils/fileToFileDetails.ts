import { FileDetails } from "../types/common.types";
import fileToBase64 from "./fileToBase64";

export default async function fileToFileDetails(file: File, withDataImgPrefix = true): Promise<FileDetails> {
  const base64Content: string = await fileToBase64(file, withDataImgPrefix);
  return {name: file.name, type: file.type, content: base64Content};
}
