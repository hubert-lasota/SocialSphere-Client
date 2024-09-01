export default function fileToBase64(file: File, withDataImgPrefix = true): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result: string = reader.result as string;
      if(!withDataImgPrefix) {
        result = result.split(",")[1];
      }
      resolve(result)
    };
    reader.onerror = reject
  });
}
