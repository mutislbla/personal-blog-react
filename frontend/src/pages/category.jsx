import Divider from "../components/divider";
import CardHome from "../components/cardHome";
import { useState, useEffect } from "react";
import { getPostByCategory } from "../utils/fetch";
import { useParams } from "react-router-dom";
export default function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const postData = await getPostByCategory(category);
        console.log("postData", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPost();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-24 px-24 ">
        <Divider name={category} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 m-24">
        {Array.isArray(posts.posts) && posts.posts.length > 0 ? (
          posts.posts.map((post) => (
            <div className="h-full rounded-lg bg-gray-200">
              <CardHome posts={post} />
            </div>
          ))
        ) : (
          <p>No Post About {category}.</p>
        )}
      </div>
    </div>
  );
}
