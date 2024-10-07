import Post from "../../components/post/Post";
import { Post as PostInterface } from "../../types/post.types";
import AddPost from "./AddPost";
import css from "./home.module.css";

type MainProps = {
  posts: PostInterface[];
};

export default function Main(props: MainProps) {
  const { posts } = props;

  return (
    <main className={css["main"]}>
      <AddPost />
      <div className={css["main__posts"]}>{posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} />)}</div>
    </main>
  );
}
