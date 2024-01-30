import { postsData } from "@/dummyData";
import CategoriesList from "./components/CategoriesList";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Posts
            key={post.id}
            id={post.id}
            author={post.author}
            datepublished={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.links}
          />
        ))
      ) : (
        <div>No posts to display</div>
      )}
    </>
  );
}
