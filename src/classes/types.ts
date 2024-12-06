import * as BABYLON from "@babylonjs/core";

export interface SceneType {
    CreateScene: (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => BABYLON.Scene;
}
