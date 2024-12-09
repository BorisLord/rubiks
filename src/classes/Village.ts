import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  int,
  Mesh,
  MeshBuilder,
  Scene,
  SceneLoader,
  Sound,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
} from "@babylonjs/core";

export default class Village {
  // public static async CreateScene(
  //   engine: Engine,
  //   canvas: HTMLCanvasElement
  // ): Promise<Scene> {
  //   const scene = new Scene(engine);
  //   const camera = new ArcRotateCamera(
  //     "camera",
  //     -Math.PI / 2,
  //     Math.PI / 2.5,
  //     15,
  //     new Vector3(0, 0, 0)
  //   );
  //   camera.attachControl(canvas, true);
  //   const light = new HemisphericLight("light", new Vector3(1, 1, 0));
  //   const importMesh = SceneLoader.ImportMeshAsync(
  //     "",
  //     "https://assets.babylonjs.com/meshes/",
  //     "village.glb"
  //   );
  //   return scene;
  // }
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);
    /**** Set camera and light *****/
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0)
    );
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0));
    buildDwellings();
    return scene;
  }
}

const buildDwellings = () => {
  const ground = buildGround();
  // const house = buildHouse(2);

  const detached_house = buildHouse(1)!;
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = buildHouse(2)!;
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  const places = []; //each entry is an array [house type, rotation, x, z]
  places.push([1, -Math.PI / 16, -6.8, 2.5]);
  places.push([2, -Math.PI / 16, -4.5, 3]);
  places.push([2, -Math.PI / 16, -1.5, 4]);
  places.push([2, -Math.PI / 3, 1.5, 6]);
  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
  places.push([1, (5 * Math.PI) / 4, 0, -1]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
  places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
  places.push([2, Math.PI / 1.9, 4.75, -1]);
  places.push([1, Math.PI / 1.95, 4.5, -3]);
  places.push([2, Math.PI / 1.9, 4.75, -5]);
  places.push([1, Math.PI / 1.9, 4.75, -7]);
  places.push([2, -Math.PI / 3, 5.25, 2]);
  places.push([1, -Math.PI / 3, 6, 4]);

  //Create instances from the first two that were built
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    if (places[i][0] === 1) {
      houses[i] = detached_house.createInstance("house" + i);
    } else {
      houses[i] = semi_house.createInstance("house" + i);
    }
    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};

/******Build Functions***********/
const buildGround = () => {
  const groundMat = new StandardMaterial("groundMat");
  groundMat.diffuseColor = new Color3(0, 1, 0);

  const ground = MeshBuilder.CreateGround("ground", {
    width: 15,
    height: 16,
  });
  ground.material = groundMat;
};

const buildHouse = (width: number) => {
  const box = buildBox(width);
  const roof = buildRoof(width);

  return Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
};

const buildBox = (width: number): Mesh => {
  const boxMat = new StandardMaterial("boxMat");
  if (width == 2) {
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/semihouse.png"
    );
  } else {
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/cubehouse.png"
    );
  }

  const faceUV = [];
  if (width == 2) {
    faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
  } else {
    faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side
  }
  // top 4 and bottom 5 not seen so not set

  /**** World Objects *****/
  const box = MeshBuilder.CreateBox("box", {
    width: width,
    faceUV: faceUV,
    wrap: true,
  });
  box.material = boxMat;
  box.position.y = 0.5;

  return box;
};

const buildRoof = (width: number): Mesh => {
  //texture
  const roofMat = new StandardMaterial("roofMat");
  roofMat.diffuseTexture = new Texture(
    "https://assets.babylonjs.com/environments/roof.jpg"
  );

  /**** World Objects *****/

  const roof = MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.scaling.y = width;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  return roof;
};

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
