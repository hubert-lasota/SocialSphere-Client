import Dropdown from "../dropdown/Dropdown";

type PostAuthorButtonProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostAuthorButton(props: PostAuthorButtonProps) {
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
