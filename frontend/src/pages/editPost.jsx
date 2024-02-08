import { editPost, getPostById } from "../utils/fetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const postData = await getPostById(id);
        console.log("postData", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching post by id:", error);
      }
    };
    fetchPostById();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      Swal.fire({
        title: "Form data",
        text: "Please make sure all fields are filled in before submitting the form.",
        icon: "warning",
      });
    } else {
      try {
        const postData = await editPost(id);
        console.log("postData", postData);
        Swal.fire({
          title: "Posting Blog",
          text: "Wait a minute until posted",
          icon: "info",
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error add post:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="flex flex-col max-w-6xl p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-5xl text-red-700  font-bold">WordWander</h1>
          <p className="text-lg text-gray-600">create new post</p>
        </div>
        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label for="title" className="block mb-2 text-sm">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={posts.title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 outline outline-offset-2 outline-1"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="content" className="text-sm">
                  Content
                </label>
              </div>
              <textarea
                type="text"
                name="content"
                id="content"
                value={posts.content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-00 text-gray-900 bg-gray-50 outline outline-offset-2 outline-1 p-3"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="category" className="text-sm">
                  Category
                </label>
              </div>
              <select
                name="category"
                id="category"
                value={posts.category}
                Placeholder="Select a category"
                onChange={(e) => setCategory(e.target.value)}
                class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm px-3 py-2 outline outline-offset-2 outline-1"
              >
                <option disabled selected>
                  Please select
                </option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Ecomonics">Ecomonics</option>
                <option value="Politics">Politics</option>
                <option value="Finance">Finance</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full py-3 font-semibold rounded-md bg-red-600 text-gray-50"
              >
                save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
