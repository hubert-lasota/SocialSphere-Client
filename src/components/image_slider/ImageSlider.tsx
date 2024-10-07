import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import "./image-slider.css";

type ImageSliderProps = {
  imageUrls: string[];
  imageInitialIndex: number;
  onCloseImageSlider: () => void;
};

export default function ImageSlider(props: ImageSliderProps) {
  const { imageUrls, imageInitialIndex, onCloseImageSlider } = props;
  const [imageIndex, setImageIndex] = useState(imageInitialIndex);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  }

  function showPreviousImage() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <div className="image-slider">
      <div className="image-slider__left">
        {imageUrls.length > 1 ? (
          <button className="image-slider__left__btn" onClick={showPreviousImage}>
            <ArrowBigLeft className="image-slider__left__btn__icon" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="image-slider__main">
        <img src={imageUrls[imageIndex]} className="image-slider__main__img" />
        <div className="image-slider__main__counter">
          {imageUrls.length > 1 ? (
            imageUrls.map((img, index) => {
              return (
                <div className="image-slider__main__counter__dot" onClick={() => setImageIndex(index)}>
                  {index === imageIndex ? <CircleDot /> : <Circle />}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="image-slider__right">
        <div className="image-slider__right__close-btn" onClick={onCloseImageSlider}>
          <FontAwesomeIcon icon={faX} size="3x" className="image-slider__right__close-btn__icon" />
        </div>
        {imageUrls.length > 1 ? (
          <button className="image-slider__right__btn " onClick={showNextImage}>
            <ArrowBigRight className="image-slider__right__btn__icon" />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
