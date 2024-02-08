export default function Banner() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            WordWander
            <strong className="text-2xl font-extrabold sm:text-4xl text-red-700 sm:block">
              Expression & Exploration.
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Exploring the corridors of my mind and heart, personal blog is a
            canvas of thoughts, emotions, and the colorful tapestry of your
            journey.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/post/add"
            >
              Create new post
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
