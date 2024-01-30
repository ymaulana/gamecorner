import Image from "next/image";

export default function SignInButtons() {
  return (
    <>
      <h1 className="mt-8 text-center">Sign in</h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 p-4">
        <button
          // onClick={() => signIn("github")}
          className="flex items-center gap-4 rounded-full border p-4 shadow-md transition hover:scale-105 hover:bg-slate-100/25"
        >
          <span>
            <Image
              src={"/github-logo.svg"}
              width={30}
              height={30}
              alt="GitHub Logo"
            />
          </span>
          Sign In With GitHub
        </button>

        <button
          // onClick={() => signIn("google")}
          className="flex items-center gap-4 rounded-full border p-4 shadow-md transition hover:scale-105 hover:bg-slate-100/25"
        >
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign In With Google
        </button>
      </div>
    </>
  );
}
