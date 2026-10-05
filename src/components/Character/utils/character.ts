import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Frees the GPU memory used by a model / scene (geometries, materials, textures)
export const disposeObject = (root: THREE.Object3D) => {
  root.traverse((obj: any) => {
    if (obj.geometry) obj.geometry.dispose();
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach((material: any) => {
      if (!material) return;
      Object.values(material).forEach((value: any) => {
        if (value && value.isTexture) value.dispose();
      });
      material.dispose();
    });
    if (obj.isLight && obj.shadow && obj.shadow.map) obj.shadow.map.dispose();
  });
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  // isCancelled() -> true when the character was removed while still loading
  // (page changed). Then we stop early and do not build anything.
  const loadCharacter = (isCancelled: () => boolean = () => false) => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        if (isCancelled()) {
          dracoLoader.dispose();
          resolve(null);
          return;
        }
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            URL.revokeObjectURL(blobUrl);
            if (isCancelled()) {
              disposeObject(gltf.scene);
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            if (isCancelled()) {
              disposeObject(character);
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = false;
                child.receiveShadow = false;
                mesh.frustumCulled = true;
                if (mesh.material && !Array.isArray(mesh.material)) {
                  (mesh.material as THREE.ShaderMaterial).precision = 'mediump';
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;