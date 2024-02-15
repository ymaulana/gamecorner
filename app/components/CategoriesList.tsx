import Link from "next/link";
import { ICategory } from "../types";

const getCategories = async (): Promise<ICategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: "no-store",
    });
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className="flex items-center justify-center gap-2">
      {categories &&
        categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.catName}`}
            className="cursor-pointer px-2 py-4 text-sm text-slate-600 hover:border-b hover:border-b-black hover:text-black"
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
