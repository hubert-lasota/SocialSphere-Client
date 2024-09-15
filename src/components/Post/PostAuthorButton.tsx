import Dropdown from "../dropdown/Dropdown";
import { usePostContext } from "./PostContext";

export default function PostAuthorButton() {
  const { editPost, deletePost } = usePostContext();
  return (
    <Dropdown>
      <>
        <div onClick={editPost}>Edit</div>
        <div onClick={deletePost} style={{ color: "red" }}>
          Delete
        </div>
      </>
    </Dropdown>
  );
}
