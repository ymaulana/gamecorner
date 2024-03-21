import PostDetail from "@/app/components/PostDetail";
import { IPost } from "@/app/types";

const getPost = async (id: string): Promise<IPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const post = await getPost(id);

  return <>{post ? <PostDetail post={post} /> : <div>Invalid Post</div>}</>;
}
