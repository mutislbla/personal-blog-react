import { useState } from "react";
import { editPost } from "../utils/fetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function EditButton({ posts }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(posts.title);
  const [content, setContent] = useState(posts.content);
  const [category, setCategory] = useState(posts.category);
  const id = posts.id;
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
        const postData = await editPost(id, title, content, category);
        console.log("postData", postData);
        Swal.fire({
          title: "Updating Blog",
          text: "Wait a minute",
          icon: "info",
        });
        setShowModal(false);
        navigate(`/post/detail/${id}`);
      } catch (error) {
        console.error("Error edit post:", error);
      }
    }
  };
  return (
    <>
      <a
        onClick={() => setShowModal(true)}
        className="block bg-red-600 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-700 mx-3 ml-3"
      >
        Edit
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flexoverflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
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
                    </div>
                    <div className="space-y-2">
                      <div>
                        <button
                          type="submit"
                          className="w-full py-3 font-semibold rounded-md bg-red-600 text-gray-50 mb-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="w-full py-3 font-semibold rounded-md bg-red-600 text-gray-50"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
