import Link from "next/link";
import { categoriesData } from "../../dummyData";

export default function CategoriesList() {
  return (
    <div className="flex items-center justify-center gap-2">
      {categoriesData.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.url}`}
          className="cursor-pointer px-2 py-4 text-sm text-slate-600 hover:border-b hover:border-b-black hover:text-black"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
