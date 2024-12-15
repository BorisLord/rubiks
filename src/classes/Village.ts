import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import rockyTerrain from "/rocky_terrain_02_diff_4k.png";

export default class Village {
  public static async CreateScene(
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0)
    );
    camera.attachControl(canvas, true);
    const _light = new HemisphericLight("light", new Vector3(1, 1, 0));

    //Create Village ground
    // const groundMat = new StandardMaterial("groundMat");
    // groundMat.diffuseTexture = new Texture(rockyTerrain);
    // groundMat.diffuseTexture.hasAlpha = true;

    // const ground = MeshBuilder.CreateGround("ground", {
    //   width: 24,
    //   height: 24,
    // });
    // ground.material = groundMat;

    //large ground
    // const largeGroundMat = new StandardMaterial("largeGroundMat");
    // largeGroundMat.diffuseTexture = new Texture(
    //   "/rocky_terrain_02_diff_4k.png"
    // );

    // const largeGround = MeshBuilder.CreateGroundFromHeightMap(
    //   "largeGround",
    //   rockyTerrain,
    //   { width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 10 }
    // );
    // largeGround.material = largeGroundMat;
    // largeGround.position.y = -0.01;

    SceneLoader.ImportMeshAsync(
      "",
      "https://assets.babylonjs.com/meshes/",
      "valleyvillage.glb"
    );

    return scene;
  }
}
