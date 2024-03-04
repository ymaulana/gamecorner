import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "../api/auth/[...nextauth]/authOptions";
import SignInButtons from "../components/SignInButtons";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <SignInButtons />;
}
