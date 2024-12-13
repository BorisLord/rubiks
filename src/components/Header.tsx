import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header className="w-full h-16 bg-purple-700 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-full">
        <a className="text-white text-xl font-bold">KubiK's</a>
        <nav className="flex space-x-4">
          <a
            href="/"
            className={`text-white px-3 py-2 rounded-md ${
              url === "/"
                ? "bg-black/80"
                : "hover:bg-black/50 transition-colors duration-200"
            }`}
          >
            Home
          </a>
          <a
            href="https://github.com/BorisLord"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="hover:opacity-90 mt-1"
          >
            <img
              src="./github-mark-white.svg"
              alt="GitHub Logo"
              className="w-8 h-8"
            />
          </a>
          {/* <a
            href="/scenes"
            className={`text-white px-3 py-2 rounded-md ${
              url === "/scenes"
                ? "bg-black/80"
                : "hover:bg-black/50 transition-colors duration-200"
            }`}
          >
            Scenes
          </a> */}
        </nav>
      </div>
    </header>
  );
}
