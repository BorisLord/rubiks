import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Sound,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
} from "@babylonjs/core";

export default class Village {
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    /**** Set camera and light *****/
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      new Vector3(0, 0, 0)
    );
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0));

    /**** Materials *****/
    //color
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0, 1, 0);

    //texture
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/roof.jpg"
    );

    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/semihouse.png"
    );

    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/
    const box = MeshBuilder.CreateBox("box", {
      width: 2,
      faceUV: faceUV,
      wrap: true,
    });
    box.material = boxMat;
    box.position.y = 0.5;
    const roof = MeshBuilder.CreateCylinder("roof", {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    });
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.scaling.y = 2;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });
    ground.material = groundMat;

    // const box2 = MeshBuilder.CreateBox("box2", {});
    // box2.scaling.x = 2;
    // box2.scaling.y = 1.5;
    // box2.scaling.z = 3;
    // box2.position = new Vector3(-3, 0.75, 0);

    // const box3 = MeshBuilder.CreateBox("box3", {});
    // box3.scaling = new Vector3(2, 1.5, 3);
    // box3.position.x = 3;
    // box3.position.y = 0.75;
    // box3.position.z = 0;

    // const sound = new Sound(
    //   "music_chill",
    //   "assets/sound/music_chill.wav",
    //   scene,
    //   null,
    //   {
    //     loop: true,
    //     autoplay: true,
    //   }
    // );
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
