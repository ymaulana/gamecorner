import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center py-3 text-sm">
      © 2024 G/C Media. design by&nbsp;
      <Link href={"/https://github.com/ymaulana"} target="blank">
        @YMaulana1609
      </Link>
    </footer>
  );
}
