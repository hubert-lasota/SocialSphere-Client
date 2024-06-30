import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import "../styles/image-slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";

type ImageSliderProps = {
  imageUrls: string[];
  imageInitialIndex: number
  handleExit: () => void;
};

export default function ImageSlider(props: ImageSliderProps) {
  const { imageUrls, imageInitialIndex, handleExit } = props;
  const [imageIndex, setImageIndex] = useState(imageInitialIndex);

  function showNextImage() {
    setImageIndex(index => {
      if(index === imageUrls.length-1 ) return 0;
      return index+1;
    })
  }

  function showPreviousImage() {
    setImageIndex(index => {
      if(index === 0) return imageUrls.length - 1;
      return index-1;
    })
  }

  return (
    <div className="image-slider">
      <div className="image-slider__counter">{imageIndex+1} / {imageUrls.length}</div>
      <img src={imageUrls[imageIndex]} className="image-slider__img" />
      <button className="image-slider__left-slide-btn image-slider__slide-btn" onClick={showPreviousImage}>
        <ArrowBigLeft />
      </button>
      <button className="image-slider__right-slide-btn image-slider__slide-btn" onClick={showNextImage}>
        <ArrowBigRight />
      </button>
      <FontAwesomeIcon
        icon={faX}
        className="image-slider__close-btn"
        onClick={handleExit}
        size="4x"
      />
    </div>
  );
}
