// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import { useEffect, useRef } from "preact/hooks";
import { useLocation } from "preact-iso";

import { JSX } from "preact";
import { Engine } from "@babylonjs/core";
import { Scenes } from "../classes/exportScenes";

export default function RenderScene(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { query } = useLocation();
  const sceneName = query.scene;
  // console.log("sceneName", sceneName);
  // console.log("CANVA", canvasRef);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas element is not ready.");
      return;
    }

    const engine = new Engine(canvasRef.current, true);

    if (!sceneName || !(sceneName in Scenes)) {
      console.error(`Scene "${sceneName}" not found in Scenes.`);
      return;
    }

    let scene;
    try {
      // Charger la scène dynamiquement
      scene = Scenes[sceneName as keyof typeof Scenes].CreateScene(
        engine,
        canvasRef.current,
      );
    } catch (error) {
      console.error("Error creating scene:", error);
      engine.dispose();
      return;
    }

    // Lancer la boucle de rendu
    engine.runRenderLoop(() => {
      scene.render();
    });

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
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
    <div>
      <canvas
        id="renderCanvas"
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
