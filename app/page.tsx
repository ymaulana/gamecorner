import CategoriesList from "./components/CategoriesList";
import Posts from "./components/Posts";
import { IPost } from "./types";

const getPosts = async (): Promise<IPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function Home() {
  const posts = await getPosts();
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
