import Divider from "./divider";
import CardHome from "./cardHome";
export default function Recent({ posts }) {
  return (
    <>
      <Divider name="Recent" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 m-24">
        {Array.isArray(posts.posts) && posts.posts.length > 0 ? (
          posts.posts.map((post) => (
            <div className="h-full rounded-lg bg-gray-200">
              <CardHome posts={post} />
            </div>
          ))
        ) : (
          <p className="ml-24">No post available.</p>
        )}
      </div>
    </>
  );
}
