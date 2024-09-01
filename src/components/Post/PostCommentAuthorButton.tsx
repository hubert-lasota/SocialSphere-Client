import Dropdown from "../dropdown/Dropdown";

type PostCommentAuthorButtonProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostCommentAuthorButton(props: PostCommentAuthorButtonProps) {
  const { onEdit, onDelete } = props;
  return (
    <Dropdown>
      <>
        <div onClick={onEdit}>Edit</div>
        <div onClick={onDelete} style={{ color: "red" }}>
          Delete
        </div>
      </>
    </Dropdown>
  );
}

