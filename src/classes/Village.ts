import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Sound,
  Vector3,
} from "@babylonjs/core";

export default class Village {
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      3,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    // src/assets/music_chill

    const sound = new Sound(
      "music_chill",
      "src/assets/music_chill",
      scene,
      null,
      {
        loop: true,
        autoplay: true,
      }
    );

    // const sound = new Sound(
    //   "music_chill",
    //   "src/assets/music_chill",
    //   scene,
    //   () => {
    //     sound.play();
    //   }
    // );

    const box = MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;

    const ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    // SceneLoader.ImportMeshAsync(
    //   "",
    //   "https://assets.babylonjs.com/meshes/",
    //   "both_houses_scene.babylon"
    // ).then((result) => {
    //   const house1 = scene.getMeshByName("detached_house")!;
    //   house1.position.y = 2;
    //   const house2 = result.meshes[2];
    //   house2.position.y = 1;
    // });

    return scene;
  }
}
