import { JSX } from "preact";

import { Scenes } from "../classes/exportScenes";

export default function DisplayScene(): JSX.Element {
  const sceneNames = Object.keys(Scenes);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <ul className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {sceneNames.map((sceneName) => (
          <li
            key={sceneName}
            className="text-center rounded-sm ring ring-gray-400 p-4 hover:shadow-lg"
          >
            <a
              href={`/rubiks/renderScene?scene=${sceneName}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {sceneName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
