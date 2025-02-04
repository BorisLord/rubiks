import { useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { JSX } from "preact";
import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Scenes } from "../classes/exportScenes";

export default function RenderScene(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { query } = useLocation();
  const sceneName = query.scene;
  const [isLoading, setIsLoading] = useState(false);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas element is not ready.");
      return;
    }

    const engine = new Engine(canvasRef.current, true);

    if (!sceneName || !(sceneName in Scenes)) {
      console.error(`Scene "${sceneName}" not found in Scenes.`);
      engine.dispose();
      return;
    }

    setIsLoading(true);
    let isMounted = true;

    // Charger la scène
    const loadScene = async () => {
      try {
        const createSceneFn =
          Scenes[sceneName as keyof typeof Scenes].CreateScene;
        const loadedScene = await Promise.resolve(
          createSceneFn(engine, canvasRef.current!),
        );

        if (isMounted) {
          setScene(loadedScene);

          // Lancer la boucle de rendu
          engine.runRenderLoop(() => {
            loadedScene.render();
          });
        }
      } catch (error) {
        console.error("Error creating scene:", error);
        engine.dispose();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadScene();

    window.addEventListener("resize", () => engine.resize());

    return () => {
      isMounted = false;
      engine.dispose();
      window.removeEventListener("resize", () => engine.resize());
    };
  }, [sceneName]);

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      // Shift + Ctrl + Alt + I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
        if (scene) {
          if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
          } else {
            scene.debugLayer.show();
          }
        } else {
          console.warn("Scene is not loaded yet to toggle the inspector.");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scene]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          Loading...
        </div>
      )}
      <canvas
        id="renderCanvas"
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
