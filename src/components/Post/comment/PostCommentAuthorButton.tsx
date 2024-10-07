import Dropdown from "../../dropdown/Dropdown";

type PostCommentAuthorButtonProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostCommentAuthorButton(props: PostCommentAuthorButtonProps) {
  const { onEdit, onDelete } = props;
  return (
    <Dropdown header={<Dropdown.HeaderThreeDots />} additionalMenuContainerStyle={{top: "1.9rem"}}>
      <>
        <div onClick={onEdit}>Edit</div>
        <div onClick={onDelete} style={{ color: "red" }}>
          Delete
        </div>
      </>
    </Dropdown>
  );
}
