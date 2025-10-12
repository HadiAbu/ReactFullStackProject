import { usePosts, useCreatePost } from "../hooks/usePosts";

export default function PostList() {
  const { data: posts, isLoading, isError } = usePosts();
  const mutation = useCreatePost();
  console.log("Posts:", posts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div>
      <button
        onClick={() => mutation.mutate({ title: "New Post" })}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Adding..." : "Add Post"}
      </button>

      <ul>
        {posts?.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
