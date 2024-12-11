import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
} from "@babylonjs/core";

export default class Ball {
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    const camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvas, true);
    const _light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene,
    );
    const _sphere: Mesh = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1 },
      scene,
    );

    return scene;
  }
}
