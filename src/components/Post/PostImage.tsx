import React, { useRef, useState } from "react";
import base64ToImgSrc from "../../utils/base64ToImgSrc";
import css from "./post.module.css";
import { usePostContext } from "./PostContext";
import { createPortal } from "react-dom";
import ImageSlider from "../image_slider/ImageSlider";

export default function PostImage() {
  const { post } = usePostContext();
  const { images } = post;

  if (!images || images.length === 0) {
    return <></>;
  }

  const [isImgSliderOpen, setIsImgSliderOpen] = useState<boolean>(false);
  const imgSliderInitialIndex = useRef<number>(0);
  const imgSliderUrls = useRef<string[]>([]);

  const handleOpenImageSlider = (imgUrls: string[], imgIndex: number) => {
    imgSliderInitialIndex.current = imgIndex;
    imgSliderUrls.current = imgUrls;
    setIsImgSliderOpen(true);
  };

  const handleCloseImageSlider = () => {
    setIsImgSliderOpen(false);
  };

  if (isImgSliderOpen) {
    return createPortal(
      <ImageSlider imageUrls={imgSliderUrls.current} imageInitialIndex={imgSliderInitialIndex.current} onCloseImageSlider={handleCloseImageSlider} />,
      document.getElementById("portal")!
    );
  }

  const imgUrls = images.map((img) => base64ToImgSrc(img.content));

  const imgLength = imgUrls.length;

  const ImgWrapper = (props: { children: React.ReactNode }) => {
    return <div className={css["post__images"]}>{props.children}</div>;
  };
  
  const RowOfTwoImgs = (props: { imgSrcOne: string; imgSrcTwo: string; indexOne: number; indexTwo: number }) => {
    const { imgSrcOne, imgSrcTwo, indexOne, indexTwo } = props;
    return (
      <div className={css["post__images__row"]}>
        <img src={imgSrcOne} className={css["post__images__double"]} onClick={() => handleOpenImageSlider(imgUrls, indexOne)} />
        <img src={imgSrcTwo} className={css["post__images__double"]} onClick={() => handleOpenImageSlider(imgUrls, indexTwo)} />
      </div>
    );
  };
  
  const RowOfSingleImg = (props: { imgSrc: string; index: number }) => {
    return (
      <div className={css["post__images__row"]}>
        <img src={props.imgSrc} className={css["post__images__single"]} onClick={() => handleOpenImageSlider(imgUrls, props.index)} />
      </div>
    );
  };

  if (imgLength > 4) {
    const sizeOfMoreImgs = imgLength - 3;

    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <div className={css["post__images__row"]}>
          <img src={imgUrls[2]} className={css["post__images__double"]} onClick={() => handleOpenImageSlider(imgUrls, 2)} />
          <div className={css["post__images__more-photos"]} onClick={() => handleOpenImageSlider(imgUrls, 3)}>
            Click to see {sizeOfMoreImgs} more photos.
          </div>
        </div>
      </ImgWrapper>
    );
  }

  if (imgLength === 4) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <RowOfTwoImgs imgSrcOne={imgUrls[2]} imgSrcTwo={imgUrls[3]} indexOne={2} indexTwo={3} />
      </ImgWrapper>
    );
  }

  if (imgLength === 3) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <RowOfSingleImg imgSrc={imgUrls[2]} index={2} />
      </ImgWrapper>
    );
  }

  if (imgLength === 2) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
      </ImgWrapper>
    );
  }

  if (imgLength === 1) {
    return (
      <ImgWrapper>
        <img src={imgUrls[0]} onClick={() => handleOpenImageSlider(imgUrls, 0)} className={css["post__images__single"]} />
      </ImgWrapper>
    );
  }
}


