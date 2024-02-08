import { deletePost } from "../utils/fetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function DeleteButton({ posts }) {
  const navigate = useNavigate();
  const id = posts.id;
  const handleDelete = async (e) => {
    Swal.fire({
      title: "Do you want to delete the post?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postData = await deletePost(id);
        console.log("postData", postData);
        await Swal.fire("Deleted!", "", "success");
        navigate(0);
      }
    });
  };
  return (
    <a
      onClick={handleDelete}
      className="block bg-red-600 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-700"
    >
      Delete
    </a>
  );
}
