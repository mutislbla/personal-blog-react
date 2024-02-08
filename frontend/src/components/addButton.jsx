import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function AddButton() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/post/add");
  };
  return (
    <div className="fixed bottom-24 right-24">
      <button
        className="rounded-full shadow-md bg-red-600 p-3 text-sm font-medium text-white transition hover:bg-red-700"
        onClick={handleAdd}
      >
        <IoIosAdd className="h-10 w-10" />
      </button>
    </div>
  );
}
