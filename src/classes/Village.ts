import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export default class Village {
  public static async CreateScene(
    engine: Engine,
    canvas: HTMLCanvasElement,
  ): Promise<Scene> {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0),
    );
    camera.attachControl(canvas, true);
    const _light = new HemisphericLight("light", new Vector3(1, 1, 0));

    SceneLoader.ImportMeshAsync(
      "",
      "https://assets.babylonjs.com/meshes/",
      "valleyvillage.glb",
    );

    return scene;
  }
}
