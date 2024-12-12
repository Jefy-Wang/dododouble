import { setupModel } from './setupModel.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function setParrot(parrotModel, { controls, loop, scene }) {
  const parrot = setupModel(parrotModel) // 从模型数据中，提取网格：鹦鹉

  parrot.position.set(0, 0, 2.5)

  controls.target.copy(parrot.position) // 将相机对准鹦鹉（默认对准位置，是场景的中心）

  loop.updatables.push(parrot)

  scene.add(parrot)

  return parrot
}

function setFlamingo(flamingoModel, { loop, scene }) {
  const flamingo = setupModel(flamingoModel) // 从模型数据中，提取网格：火烈鸟

  flamingo.position.set(7.5, 0, -10)

  loop.updatables.push(flamingo)

  scene.add(flamingo)

  return flamingoModel
}

function setStork(storkModel, { loop, scene }) {
  const stork = setupModel(storkModel) // 从模型数据中，提取网格：鹳

  stork.position.set(0, -2.5, -10)

  loop.updatables.push(stork)

  scene.add(stork)

  return stork
}

export function loadBirds(loadOption = {}) {
  const loader = new GLTFLoader()

  Promise
    .all([
      loader.loadAsync(`${import.meta.env.BASE_URL}models/flyingBird/Stork.glb`).then(gltf => setStork(gltf, loadOption)), // 鹳
      loader.loadAsync(`${import.meta.env.BASE_URL}models/flyingBird/Parrot.glb`).then((gltf) => setParrot(gltf, loadOption)), // 鹦鹉
      loader.loadAsync(`${import.meta.env.BASE_URL}models/flyingBird/Flamingo.glb`).then(gltf => setFlamingo(gltf, loadOption)) // 火烈鸟
    ])
    .then(() => {}) // 同时加载三个模型文件（由于浏览器限制，可能会有 1ms 的偏差，但大体是同时触发的）
    .catch(() => {})
}
