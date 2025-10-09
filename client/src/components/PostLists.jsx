import { usePosts, useCreatePost } from "../hooks/usePosts.js";

export default function PostList() {
  const { data: posts, isLoading, isError } = usePosts();
  const createPost = useCreatePost();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div>
      <button onClick={() => createPost.mutate({ title: "New Post" })}>
        Add Post
      </button>

      <ul>
        {posts?.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
