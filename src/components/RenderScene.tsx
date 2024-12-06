import { useEffect, useRef } from "preact/hooks";
import { Scenes } from "../classes/exportScenes";
import * as BABYLON from "@babylonjs/core";
import { JSX } from "preact";
import { useLocation } from "preact-iso";

export default function RenderScene(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { query } = useLocation();
  const sceneName = query.scene;
  console.log(sceneName);
  console.log(canvasRef);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialiser Babylon.js avec le canvas
    const engine = new BABYLON.Engine(canvasRef.current, true);

    // Charger la scène "First" depuis vos exports
    const scene = Scenes[sceneName as keyof typeof Scenes].CreateScene(engine, canvasRef.current);

    // Lancer la boucle de rendu
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Ajuster la taille du canvas en cas de redimensionnement de la fenêtre
    window.addEventListener("resize", () => engine.resize());

    // Cleanup à la destruction du composant
    return () => {
      engine.dispose();
      window.removeEventListener("resize", () => engine.resize());
    };
  }, [sceneName]);

  return (
    <canvas
      id="renderCanvas"
      ref={canvasRef}
      className="w-full h-full block"
    ></canvas>
  );
}
