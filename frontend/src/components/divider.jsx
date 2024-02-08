export default function Divider({ name }) {
  return (
    <span className="flex items-center mx-24">
      <span className="text-xl font-extrabold sm:text-3xl pr-6">
        <strong className="font-extrabold text-red-700 sm:block">{name}</strong>
      </span>
      <span className="h-px flex-1 bg-black"></span>
    </span>
  );
}
