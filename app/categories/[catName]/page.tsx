import CategoriesList from "@/app/components/CategoriesList";
import Posts from "@/app/components/Posts";
import { IPost } from "@/app/types";

const getPosts = async (catName: string): Promise<IPost[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function CategoryPosts({
  params,
}: {
  params: { catName: string };
}) {
  const category = params.catName;
  const posts = await getPosts(category);

  return (
    <>
      <CategoriesList />
      <h1>
        <span className="font-normal">Category: </span>{" "}
        {decodeURIComponent(category)}
      </h1>

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Posts
            key={post.id}
            id={post.id}
            author={post.author.name}
            datepublished={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
}
