export function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">
        404 : Page Not Found
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/rubiks"
        className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-200"
      >
        Go Back Home
      </a>
    </section>
  );
}
