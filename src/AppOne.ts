import * as BABYLON from "babylonjs";
export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas);
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas);
    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

var createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a rotate camera
    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 4,
        Math.PI / 3,
        20,
        BABYLON.Vector3.Zero(),
        scene
    );

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    const colors = {
        white: new BABYLON.StandardMaterial("white", scene),
        red: new BABYLON.StandardMaterial("red", scene),
        blue: new BABYLON.StandardMaterial("blue", scene),
        orange: new BABYLON.StandardMaterial("orange", scene),
        green: new BABYLON.StandardMaterial("green", scene),
        yellow: new BABYLON.StandardMaterial("yellow", scene),
    };

    colors.white.diffuseColor = new BABYLON.Color3(1, 1, 1);
    colors.red.diffuseColor = new BABYLON.Color3(1, 0, 0);
    colors.blue.diffuseColor = new BABYLON.Color3(0, 0, 1);
    colors.orange.diffuseColor = new BABYLON.Color3(1, 0.647, 0);
    colors.green.diffuseColor = new BABYLON.Color3(0, 1, 0);
    colors.yellow.diffuseColor = new BABYLON.Color3(1, 1, 0);

    const baseColors = [
        colors.red,
        colors.blue,
        colors.orange,
        colors.green,
        colors.white,
        colors.yellow,
    ];

    const cubeSize = 1;
    const spacing = 0.1;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const box = BABYLON.MeshBuilder.CreateBox(
                    "box",
                    { size: cubeSize },
                    scene
                );
                box.position.x = (x - 1) * (cubeSize + spacing);
                box.position.y = (y - 1) * (cubeSize + spacing);
                box.position.z = (z - 1) * (cubeSize + spacing);

                // Ajouter des couleurs ou des textures à chaque face du cube ici, si souhaité
                box.material = baseColors[(x * 3 + y + z) % baseColors.length];
            }
        }
    }

    return scene;
};
