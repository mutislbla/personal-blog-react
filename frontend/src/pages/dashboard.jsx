import Divider from "../components/divider";
import CardProfil from "../components/cardProfil";
import { getPostByUser, getUser } from "../utils/fetch";
import { useState, useEffect } from "react";
import Category from "../components/category";
import AddButton from "../components/addButton";
export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userData = await getUser();
        console.log("userData", userData);
        setUserData(userData);
        setUsername(userData.user.username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserDetail();
  }, []);
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const postData = await getPostByUser();
        console.log("postData", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostById();
  }, []);
  return (
    <div className="bg-gray-50  pb-15">
      <div className="mx-24 mt-24 pt-24 mb-10">
        <Divider name={username} />
      </div>
      <Category />
      <AddButton />
      <div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 m-24">
          {Array.isArray(posts.posts) && posts.posts.length > 0 ? (
            posts.posts.map((post) => (
              <div className="h-full rounded-lg bg-gray-200">
                <CardProfil posts={post} />
              </div>
            ))
          ) : (
            <p>No post available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
