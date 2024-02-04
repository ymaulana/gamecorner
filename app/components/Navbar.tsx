"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="relative mb-4 flex justify-between border-b pb-4 shadow-[0_4px_6px_-6px_#222]">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl font-bold tracking-tighter text-dark">
            Games Corner
          </h1>
        </Link>
        <p className="text-sm text-slate-700">
          Gaming Reviews, News, Tips and More.
        </p>
      </div>
      {status === "authenticated" ? (
        <>
          <div
            ref={popupRef}
            className={`absolute right-0 top-20 z-30 min-w-[160px] flex-col gap-2 rounded-md bg-white p-6 text-right shadow-lg
              ${isPopupVisible ? "flex" : "hidden"}
            `}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link
              onClick={() => setIsPopupVisible(false)}
              href={"/dashboard"}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setIsPopupVisible(false)}
              href={"/create-post"}
              className="hover:underline"
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="mr-6 hidden items-center gap-2 md:flex"
              href={"/create-post"}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>Create new</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              className="cursor-pointer rounded-full"
              onClick={() => setIsPopupVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
