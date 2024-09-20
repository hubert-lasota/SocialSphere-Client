import Dropdown from "../dropdown/Dropdown";
import { usePostContext } from "./PostContext";

export default function PostAuthorButton() {
  const { editPost, deletePost } = usePostContext();
  return (
    <Dropdown header={<Dropdown.HeaderThreeDots/>} additionalMenuContainerStyle={{top: "1.9rem"}}>
      <>
        <div onClick={editPost}>Edit</div>
        <div onClick={deletePost} style={{ color: "red" }}>
          Delete
        </div>
      </>
    </Dropdown>
  );
}
