import First from "./First";
import Rubiks from "./Rubiks";
import Village from "./Village";
import Ball from "./ball";
import { Engine, Scene } from "@babylonjs/core";

interface SceneType {
  CreateScene: (engine: Engine, canvas: HTMLCanvasElement) => Scene;
}

export const Scenes: Record<string, SceneType> = {
  Rubiks,
  Village,
  First,
  Ball,
};
