import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import authOptions from "../api/auth/[...nextauth]/authOptions";
import DeleteButton from "./DeleteButton";

interface PostProps {
  id: string;
  datepublished: string;
  thumbnail?: string;
  author: string;
  authorEmail?: string;
  title: string;
  links?: string[];
  category?: string;
  content?: string;
}

export default async function Posts({
  id,
  author,
  authorEmail,
  datepublished,
  thumbnail,
  title,
  links,
  category,
  content,
}: PostProps) {
  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === authorEmail;

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = (date: string) => {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString("en-US", options);
  };

  return (
    <div className="my-4 border-b border-b-slate-400 py-6">
      <div className="mb-4">
        {author ? (
          <>
            Posted by: <span className="font-bold">{author}</span> on{" "}
            {formattedDate(datepublished)}
          </>
        ) : (
          <>Posted on {formattedDate(datepublished)}</>
        )}
      </div>

      <div className="relative h-72 w-full">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="rounded-md object-cover object-center"
          />
        ) : (
          <Image
            src={"/thumbnail-placeholder.png"}
            alt={title}
            fill
            priority
            className="rounded-md object-cover object-center"
          />
        )}
      </div>

      {category && (
        <Link
          className="mt-4 block w-fit rounded-md bg-slate-800 px-4 py-0.5 text-sm font-bold text-white"
          href={`categories/${category}`}
        >
          {category}
        </Link>
      )}

      <h2>{title}</h2>
      <p className="content">{content}</p>

      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* link icon */}
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
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>

              <Link className="link" target="blank" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      {isEditable && (
        <div className="flex w-fit gap-10 rounded-md bg-slate-200 px-4 py-2 font-bold">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
}
