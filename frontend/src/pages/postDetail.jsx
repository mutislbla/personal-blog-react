import { useParams } from "react-router-dom";
import { getUser, getPostById } from "../utils/fetch";
import { useState, useEffect } from "react";
export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState([]);
  const [full_name, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [year, month, day] = createdAt.split("T")[0].split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const postData = await getPostById(id);
        console.log("postData", postData);
        setPost(postData);
        setTitle(postData.post.title);
        setContent(postData.post.content);
        setCategory(postData.post.category);
        setImage(postData.post.image);
        setCreatedAt(postData.post.created_at);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostById();
  }, [id]);
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userData = await getUser();
        console.log("userData", userData);
        setUserData(userData);
        setFullName(userData.user.full_name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserDetail();
  }, []);
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800 min-h-screen flex justify-center items-center">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <img
          src={image}
          alt={title}
          className="w-full h-60 sm:h-96 bg-gray-500"
        />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
          <div className="space-y-2">
            <a
              rel="noopener noreferrer"
              href="#"
              className="inline-block text-2xl font-semibold sm:text-3xl"
            >
              {title}
            </a>
            <p className="text-xs text-gray-600">
              By{" "}
              <a
                rel="noopener noreferrer"
                href="/dashboard"
                className="text-xs hover:underline"
              >
                {full_name}{" "}
              </a>
              on {day} {monthNames[Number(month) - 1]} {year}
            </p>
          </div>
          <div className="text-gray-800">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
