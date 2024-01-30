import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative mb-4 flex justify-between border-b pb-4 shadow-[0_4px_6px_-6px_#222]">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Games Corner
          </h1>
        </Link>
        <p className="text-sm text-slate-700">
          Gaming Reviews, News, Tips and More.
        </p>
      </div>
      <div className="flex items-center">
        <Link className="btn" href={"/sign-in"}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
