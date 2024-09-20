import css from "./chat.module.css";

type MessageProps = {
  profilePictureSrc: string;
  content: string;
  isSender: boolean;
};

export default function Message(props: MessageProps) {
  const { profilePictureSrc, content, isSender} = props;

  const messageClassName = isSender ? css["messages__message-right"] : css["messages__message-left"];

  return (
    <div className={messageClassName}>
      {!isSender ? (
        <div className="flex align-items-center column-gap-large">
          <img src={profilePictureSrc} alt="profile" className="profile-picture" />
          <div className={css["messages__message-left__content"]}>{content}</div>
        </div>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}
