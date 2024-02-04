import CreatePostForm from "../components/CreatePostForm";

export default async function CreatePost() {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // if (!session) {
  //   redirect("/sign-in");
  // }
  return <CreatePostForm />;
}
