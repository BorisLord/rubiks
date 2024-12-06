import * as BABYLON from "@babylonjs/core";

export default class Rubiks {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Créer une scène Babylon.js
        const scene = new BABYLON.Scene(engine);

        // Ajouter une caméra ArcRotate pour interagir avec le cube
        const camera = new BABYLON.ArcRotateCamera(
            "Camera",
            Math.PI / 4,
            Math.PI / 3,
            20,
            BABYLON.Vector3.Zero(),
            scene
        );

        // Fixer la caméra au point d'origine
        camera.setTarget(BABYLON.Vector3.Zero());

        // Permettre le contrôle de la caméra via la souris ou le tactile
        camera.attachControl(canvas, true);

        // Ajouter une lumière hémisphérique pour éclairer la scène
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Créer les cubes du Rubik's Cube
        Rubiks.createRubikCubes(scene);

        return scene;
    }

    private static createRubikCubes(scene: BABYLON.Scene) {
        const cubeSize = 1; // Taille d'un cube
        const spacing = 0.1; // Espace entre les cubes

        // Créer des matériaux de couleur pour les faces du Rubik's Cube
        const colors = Rubiks.createRubikMaterials(scene);

        // Générer une grille 3x3x3 de cubes
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    const box = BABYLON.MeshBuilder.CreateBox(
                        `box-${x}-${y}-${z}`,
                        { size: cubeSize },
                        scene
                    );
                    box.position.x = (x - 1) * (cubeSize + spacing);
                    box.position.y = (y - 1) * (cubeSize + spacing);
                    box.position.z = (z - 1) * (cubeSize + spacing);

                    // Assigner une couleur de matériau aux cubes
                    box.material = colors[(x * 3 + y + z) % colors.length];
                }
            }
        }
    }

    private static createRubikMaterials(scene: BABYLON.Scene): BABYLON.StandardMaterial[] {
        // Créer des matériaux pour chaque couleur
        const materials = {
            white: new BABYLON.StandardMaterial("white", scene),
            red: new BABYLON.StandardMaterial("red", scene),
            blue: new BABYLON.StandardMaterial("blue", scene),
            orange: new BABYLON.StandardMaterial("orange", scene),
            green: new BABYLON.StandardMaterial("green", scene),
            yellow: new BABYLON.StandardMaterial("yellow", scene),
        };

        materials.white.diffuseColor = new BABYLON.Color3(1, 1, 1);
        materials.red.diffuseColor = new BABYLON.Color3(1, 0, 0);
        materials.blue.diffuseColor = new BABYLON.Color3(0, 0, 1);
        materials.orange.diffuseColor = new BABYLON.Color3(1, 0.647, 0);
        materials.green.diffuseColor = new BABYLON.Color3(0, 1, 0);
        materials.yellow.diffuseColor = new BABYLON.Color3(1, 1, 0);

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

