import {
  GLTFLoader
} from 'three/addons'
import { setupModel } from './setupModel.js'

export async function loadBirds() {
  const loader = new GLTFLoader()

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('/models/Parrot.glb'), // 鹦鹉
    loader.loadAsync('/models/Flamingo.glb'), // 火烈鸟
    loader.loadAsync('/models/Stork.glb') // 鹳
  ]) // 同时加载三个模型文件

  const parrot = setupModel(parrotData) // 从模型数据中，提取网格：鹦鹉
  parrot.position.set(0, 0, 2.5)

  const flamingo = setupModel(flamingoData) // 从模型数据中，提取网格：火烈鸟
  flamingo.position.set(7.5, 0, -10)

  const stork = setupModel(storkData) // 从模型数据中，提取网格：鹳
  stork.position.set(0, -2.5, -10)

  return {
    parrot,
    flamingo,
    stork
  }
}
