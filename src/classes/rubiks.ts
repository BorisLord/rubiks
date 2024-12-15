import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  TransformNode,
  Vector3,
  PointerEventTypes,
  DynamicTexture,
} from "@babylonjs/core";

export default class Rubiks {
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "Camera",
      Math.PI / 4,
      Math.PI / 3,
      20,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light1.diffuse = new Color3(1, 1, 1); // Lumière blanche
    light1.specular = new Color3(0.5, 0.5, 0.5); // Réflexion douce
    light1.groundColor = new Color3(0.1, 0.1, 0.1); // Légère lumière venant du bas

    const light2 = new HemisphericLight(
      "light2",
      new Vector3(-1, -1, -1),
      scene
    );
    light2.diffuse = new Color3(0.6, 0.6, 0.8); // Lumière légèrement bleutée
    light2.specular = new Color3(0.3, 0.3, 0.3); // Réflexion douce
    light2.groundColor = new Color3(0.2, 0.2, 0.3); // Légère lumière venant du bas

    // Créer les cubes et récupérer le noeud pour la face avant
    const frontFaceNode = Rubiks.createRubikCubes(scene);

    // Ajouter un gestionnaire d'événements pour la souris
    // Rubiks.addMouseInteraction(scene, frontFaceNode);

    return scene;
  }

  private static createRubikCubes(scene: Scene): TransformNode {
    const cubeSize = 1;
    const spacing = 0.1;
    let cubeNumber = 1; // Compteur pour numéroter chaque cube

    const colors = Rubiks.createRubikMaterials(scene);

    const frontFaceNode = new TransformNode("frontFaceNode", scene);

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const box = MeshBuilder.CreateBox(
            `box-${x}-${y}-${z}`,
            { size: cubeSize },
            scene
          );

          box.position.x = (x - 1) * (cubeSize + spacing);
          box.position.y = (y - 1) * (cubeSize + spacing);
          box.position.z = (z - 1) * (cubeSize + spacing);
          // box.add text to face on cube
          // Matériau avec numéro
          const dynamicTexture = new DynamicTexture(
            `dynamicTexture-${cubeNumber}`,
            256,
            scene,
            false
          );
          dynamicTexture.drawText(
            cubeNumber.toString(), // Numéro du cube
            null, // Centrer automatiquement sur l'axe X
            128, // Centrer verticalement
            "bold 48px Arial", // Style de texte
            "white", // Couleur du texte
            "black", // Couleur de fond
            true // Mettre à jour automatiquement
          );

          const textMaterial = new StandardMaterial(
            `textMaterial-${cubeNumber}`,
            scene
          );
          textMaterial.diffuseTexture = dynamicTexture;

          box.material = textMaterial;

          cubeNumber++;
          // box.material = colors[(x * 3 + y + z) % colors.length];

          // Appliquer le matériau au cube

          // // Attachez les cubes de la face avant au noeud frontFaceNode
          // if (z === 2) {
          //   box.parent = frontFaceNode;
          // }
        }
      }
    }

    return frontFaceNode;
  }

  private static addMouseInteraction(
    scene: Scene,
    frontFaceNode: TransformNode
  ) {
    let isRotating = false; // Indicateur pour savoir si une rotation est en cours

    scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
        // Déclencher la rotation au clic gauche
        if (pointerInfo.event.button === 0 && !isRotating) {
          isRotating = true;
          Rubiks.rotateFrontFace(frontFaceNode, () => {
            isRotating = false; // Réinitialiser l'indicateur après la rotation
          });
        }
      }
    });
  }

  private static rotateFrontFace(
    frontFaceNode: TransformNode,
    onComplete: () => void
  ) {
    const totalRotation = Math.PI / 2; // Rotation de 90 degrés
    const rotationSpeed = 0.1; // Vitesse de rotation
    let accumulatedRotation = 0;

    const scene = frontFaceNode.getScene();

    const rotationObserver = scene.onBeforeRenderObservable.add(() => {
      const step = (rotationSpeed * scene.getEngine().getDeltaTime()) / 16; // Ajuster par rapport au temps réel
      frontFaceNode.rotation.z += step;
      accumulatedRotation += step;

      if (accumulatedRotation >= totalRotation) {
        // Limiter à 90 degrés et arrêter la rotation
        frontFaceNode.rotation.z =
          Math.round(frontFaceNode.rotation.z / totalRotation) * totalRotation;
        scene.onBeforeRenderObservable.remove(rotationObserver);
        onComplete();
      }
    });
  }

  private static createRubikMaterials(scene: Scene): StandardMaterial[] {
    const materials = {
      white: new StandardMaterial("white", scene),
      red: new StandardMaterial("red", scene),
      blue: new StandardMaterial("blue", scene),
      orange: new StandardMaterial("orange", scene),
      green: new StandardMaterial("green", scene),
      yellow: new StandardMaterial("yellow", scene),
    };

    materials.white.diffuseColor = Color3.White();
    materials.red.diffuseColor = Color3.Red();
    materials.blue.diffuseColor = Color3.Blue();
    materials.orange.diffuseColor = new Color3(1, 0.55, 0);
    materials.green.diffuseColor = Color3.Green();
    materials.yellow.diffuseColor = Color3.Yellow();

    return [
      materials.red,
      materials.blue,
      materials.orange,
      materials.green,
      materials.white,
      materials.yellow,
    ];
  }
}
