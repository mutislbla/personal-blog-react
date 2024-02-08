import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
export default function CardProfil({ posts }) {
  const datePost = posts.created_at;
  const [year, month, day] = datePost.split("T")[0].split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const readMore = `/post/detail/${posts.id}`;
  return (
    <article className="flex bg-white transition hover:shadow-xl m-3 ">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          datetime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{posts.category}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>
            {monthNames[Number(month) - 1]} {day}
          </span>
        </time>
      </div>
      <div className="hidden sm:block sm:basis-56">
        <img
          alt={posts.title}
          src={posts.image}
          className="aspect-square h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href={readMore}>
            <h3 className="font-bold uppercase text-gray-900">{posts.title}</h3>
          </a>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {posts.content}
          </p>
        </div>
        <div className="sm:flex sm:items-end sm:justify-end">
          <EditButton posts={posts} />
          <DeleteButton posts={posts} />
        </div>
      </div>
    </article>
  );
}
