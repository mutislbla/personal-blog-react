import Banner from "../components/banner";
import Category from "../components/category";
import Recent from "../components/recent";
import { useState, useEffect } from "react";
import { getRecentPost } from "../utils/fetch";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const postData = await getRecentPost();
        console.log("postData", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchRecentPost();
  }, []);
  return (
    <div className="bg-gray-50">
      <Banner />
      <Category />
      <Recent posts={posts} />
    </div>
  );
}
