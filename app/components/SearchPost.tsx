"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchPost() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchParams.has("query")) {
      setSearchInput(searchParams.get("query")?.toString() || "");
    } else {
      setSearchInput("");
    }
  }, [pathname, searchParams]);

  const handleSearch = (term: string) => {
    setSearchInput(term);

    if (debounce.current !== null) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`/?${params.toString()}`);
    }, 500);
  };
  // const handleSearch = useDebouncedCallback((term: string) => {
  //   setSearchInput(term);

  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   replace(`/?${params.toString()}`);
  // }, 500);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="search post"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchInput}
          // defaultValue={
          //   pathname.includes("/?query")
          //     ? searchParams.get("query")?.toString()
          //     : ""
          // }
        />
      </div>
    </>
  );
}
