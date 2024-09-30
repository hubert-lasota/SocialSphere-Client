import React, { CSSProperties, useEffect, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "../../css/global.css";
import css from "./file-uploader.module.css";

type Image = {
  imageName: string;
  imageSrc: string;
  index: number;
};

type FileUploaderProps = {
  onFilesUpload: (files: File[]) => void;
  onFileRemove: (fileIndex: number) => void;
  initialFiles?: File[];
  addFileMessage?: string;
  maxFiles?: number;
  acceptFileType?: string;
  additionalStyle?: CSSProperties;
};

const DEFAULT_ADD_FILE_MESSAGE = "Browse Files to upload";

export default function FileUploader(props: FileUploaderProps) {
  const {
    onFilesUpload,
    onFileRemove,
    maxFiles = 10,
    acceptFileType = "image/*",
    addFileMessage = DEFAULT_ADD_FILE_MESSAGE,
    initialFiles,
    additionalStyle,
  } = props;
  const [images, setImages] = useState<Image[]>([]);
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    if (initialFiles) {
      const imgs: Image[] = initialFiles.map((file, index) => {
        const fileUrl = URL.createObjectURL(file);
        const img: Image = { imageName: file.name, imageSrc: fileUrl, index: index };
        return img;
      });
      setImages(imgs);
      setIndex(initialFiles.length - 1);
    }
  }, []);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) {
      throw new Error("File list is null");
    }

    const fileArr: File[] = [];
    for (const file of files) {
      const fileUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, { imageName: file.name, imageSrc: fileUrl, index: prev.length }]);
      fileArr.push(file);
    }
    onFilesUpload(fileArr);
  };

  const removeFile = (fileIndex: number) => {
    const newImages = [...images];
    newImages.splice(fileIndex, 1);
    setImages(newImages);
    setIndex(newImages.length - 1);
    onFileRemove(fileIndex);
  };

  const click = () => {
    document.getElementById("file-uploade-input")!.click();
  };

  const getImgSrc = () => {
    if (index === -1) return images[images.length - 1].imageSrc;
    return images[index].imageSrc;
  };

  return (
    <div className={css["file-uploader-wrapper"]} style={additionalStyle}>
      <div className={css["file-uploader"]} onClick={() => click()}>
        <input id="file-uploade-input" type="file" multiple max={maxFiles} accept={acceptFileType} hidden onChange={(e) => uploadFile(e)} />
        {images && images.length > 0 ? (
          <img src={getImgSrc()} className={css["uploaded-file"]} />
        ) : (
          <>
            <MdCloudUpload size={50} className={css["file-uploader__icon"]} />
            <p className={css["add-file-message"]}>{addFileMessage}</p>
          </>
        )}
      </div>
      <div className={css["uploaded-rows"]}>
        {images &&
          images.length > 0 &&
          images.map((img) => {
            return (
              <p className={css["uploaded-row"]} key={img.index}>
                <span
                  className={css["switch-file"]}
                  onClick={() => {
                    setIndex(img.index);
                  }}
                >
                  <AiFillFileImage size={17} />
                </span>
                <span>
                  {img.imageName} <MdDelete className={css["remove-file"]} size={20} onClick={() => removeFile(img.index)} />
                </span>
              </p>
            );
          })}
      </div>
    </div>
  );
}
