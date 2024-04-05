import CategoriesList from "./components/CategoriesList";
import Posts from "./components/Posts";
import { IPost } from "./types";

const getPosts = async (query?: string): Promise<IPost[] | null> => {
  try {
    let url = `${process.env.NEXTAUTH_URL}/api/posts`;

    // If a query is provided, append it to the URL
    if (query) {
      url += `?query=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const posts = await getPosts(query);
  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Posts
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
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
