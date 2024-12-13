import DisplayScene from "../components/DisplayScenes";

export function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-300 px-4 py-8">
      <img src="/babylonjs.svg" alt="BabylonJS Logo" className="h-36 mb-6" />
      <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-4">
        Explore BabylonJS Projects I've Built
      </h1>
      <div className="w-full max-w-4xl mt-4">
        <DisplayScene />
      </div>
    </div>
  );
}
