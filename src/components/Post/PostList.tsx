import { useState } from "react";
import PostComponent from "./Post";
import { v4 as uuidv4 } from "uuid";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Post } from "../../types/post.types";
import styles from "./post.module.css"
import { createPortal } from "react-dom";

type PostListProps = {
  posts: Post[];
};

export default function PostList(props: PostListProps) {
  const [openImageSlider, setOpenImageSlider] = useState(false);
  const [imageSliderUrls, setImageSliderUrls] = useState<string[]>([]);
  const [imageSliderInitialIndex, setImageSliderInitialIndex] = useState(0);
  const [pagePosition, setPagePosition] = useState(0);

  const { posts } = props;

  function handleImageSlider(images: Uint8Array[], index: number) {
    setPagePosition(window.scrollY);
    const imageUrls: string[] = images.map((img) => {
      return `data:image/png;base64,${img}`;
    });
    setImageSliderUrls(imageUrls);
    setImageSliderInitialIndex(index);
    setOpenImageSlider(true);
  }

  function handleCloseImageSlider() {
    setImageSliderUrls([]);
    setOpenImageSlider(false);
    setTimeout(() => {
      window.scrollTo(0, pagePosition);
    }, 0);
  }

  function createImageComponent(images: Uint8Array[]): JSX.Element {
    if(images.length < 1) {
      return <></>;
    }
    const newImages: Uint8Array[] = [];
    let className: string = styles["img-container__img"];
    let additionalClassName: string = className;

    for (let i = 0; i < images.length && i < 4; i++) {
      newImages[i] = images[i];
    }

    switch (newImages.length) {
      case 1:
        className += ` ${styles["img-container__img-one"]}`;
        break;
      case 2:
        className += ` ${styles["img-container__img-two"]}`
        break;
      case 3:
        className += ` ${styles["img-container__img-three-first-row"]}`
        additionalClassName += ` ${styles["img-container__img-three-second-row"]}`
        break;
      case 4:
        className += " img-container__img-four";
        break;
    }

    return (
      <div className={styles["content__img-container"]}>
        {newImages.map((img, index) => {
          const uniqueImgKey = uuidv4();
          const src = `data:image/png;base64,${img}`;
          let cn = className;
          if (index === 2 && newImages.length < 4) {
            cn = additionalClassName;
          }

          if (index === 3 && images.length > 4) {
            return (
              <div className={styles["img-container__more"]}>
                <span className={styles["img-container__more__text"]}>
                  +{images.length - (index + 1)} more photos...
                </span>
              </div>
            );
          }

          return (
            <img
              key={uniqueImgKey}
              data-index={index}
              src={src}
              className={cn}
              onClick={(event) =>
                handleImageSlider(
                  images,
                  parseInt(
                    (event.target as HTMLImageElement).getAttribute(
                      "data-index"
                    ) || "0"
                  )
                )
              }
            />
          );
        })}
      </div>
    );
  }

  function createProfilePicutreSrc(profilePicture: Uint8Array | null): string {
    let profilePictureSrc;
    if (profilePicture) {
      profilePictureSrc = `data:image/png;base64,${profilePicture}`;
    } else {
      profilePictureSrc = "src/assets/default-profile-picture.png";
    }
    return profilePictureSrc;
  }
  
  if (openImageSlider) {
    return createPortal(<ImageSlider
      imageUrls={imageSliderUrls}
      imageInitialIndex={imageSliderInitialIndex}
      handleExit={handleCloseImageSlider}
    />, document.getElementById("portal") as HTMLElement)
  }

  return posts.map((post) => (
    <PostComponent
      key={post.id}
      id={post.id}
      userId={post.userId}
      profilePictureSrc={createProfilePicutreSrc(
        post.userProfile.profilePicture
      )}
      firstName={post.userProfile.firstName}
      lastName={post.userProfile.lastName}
      content={post.content}
      likeCount={post.likeCount}
      commentCount={post.commentCount}
      isLiked={post.isLiked}
    >
      {createImageComponent(post.images)}
    </PostComponent>
  ));
}
