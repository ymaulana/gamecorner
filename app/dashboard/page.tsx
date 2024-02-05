import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/sign-in");
  }
  return <div>page</div>;
}
