import { useState, useEffect } from "react";
import { addPost } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category || imageFile == null) {
      Swal.fire({
        title: "Form data",
        text: "Please make sure all fields are filled in before submitting the form.",
        icon: "warning",
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("image", imageFile);
        const postData = await addPost(formData);
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
                value={title}
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
                value={content}
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
                value={category}
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
            <div>
              <div className="flex justify-between mb-2">
                <label for="image" className="text-sm">
                  Image
                </label>
              </div>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    width={500}
                    height={500}
                    className="w-32 h-32 object-cover mb-2 rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 4v16m8-8H4"></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      Drag and drop or click to select a file
                    </p>
                  </div>
                )}
              </label>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-lg font-semibold text-gray-700">
                    {imagePreview.name}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full py-3 font-semibold rounded-md bg-red-600 text-gray-50"
              >
                create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
