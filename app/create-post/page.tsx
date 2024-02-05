import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreatePostForm from "../components/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/sign-in");
  }
  return <CreatePostForm />;
}
