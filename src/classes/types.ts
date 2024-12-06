import { Engine, Scene } from "@babylonjs/core";

export interface SceneType {
    CreateScene: (engine: Engine, canvas: HTMLCanvasElement) => Scene;
}
