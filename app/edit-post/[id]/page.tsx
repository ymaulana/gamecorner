import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import EditPostForm from "../../components/EditPostForm";
import { IPost } from "../../types";

const getPosts = async (id: string): Promise<IPost | null> => {
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

export default async function EditPost({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const id = params.id;
  const post = await getPosts(id);

  return <>{post ? <EditPostForm post={post} /> : <div>Invalid Post</div>}</>;
}
