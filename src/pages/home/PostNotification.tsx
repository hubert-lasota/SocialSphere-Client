import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Post from "../../components/post/Post";
import { PostNotification as IPostNotification } from "../../types/post.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";

type PostNotificationProps = {
  notification: IPostNotification;
};

export default function PostNotification(props: PostNotificationProps) {
  const { updatedPost, updateType, updatedBy } = props.notification;
  const [isNotificationClicked, setIsNotificationClicked] = useState<boolean>(false);

  if (isNotificationClicked) {
    return (
      <Modal open={true} onClose={() => setIsNotificationClicked(false)}>
        <Post post={updatedPost} additionalStyle={{padding: "1.5rem"}}/>
      </Modal>
    );
  }

  return (
    <div className="flex align-items-center column-gap-small" style={{ cursor: "pointer" }} onClick={() => setIsNotificationClicked(true)}>
      <img src={getUserProfileImgSrc(updatedBy?.profilePicture || null)} alt="profile" className="profile-picture" style={{ cursor: "pointer" }} />
      <span>
        {updatedBy.firstName + " " + updatedBy.lastName + " "}
        {updateType === "LIKE" ? "liked " : "commented "}your post
      </span>
    </div>
  );
}
