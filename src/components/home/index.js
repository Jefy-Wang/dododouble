import {
  createAxesHelper,
  createGridHelper
} from './components/helpers.js'
import Loop from './systems/Loop.js'
import Resizer from './systems/Resizer.js'
import { createScene } from './components/scene.js'
import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createRenderer } from './systems/renderer.js'
import { createControls } from './systems/controls.js'
import { loadBirds } from './components/birds/birds.js'

// These variables are module-scoped: we cannot access them from outside the module
let loop, scene, camera, renderer, controls
export default class Home {
  constructor(el) {
    scene = createScene() // 创建场景
    camera = createCamera() // 创建相机
    renderer = createRenderer() // 创建渲染器
    loop = new Loop(camera, scene, renderer)

    el.append(renderer.domElement) // 将画布添加到容器中

    controls = createControls(camera, renderer.domElement)
    const light = createLights() // 创建照明

    loop.updatables.push(controls)
    scene.add(light.ambientLight, light.mainLight) // 向场景中添加光照

    const resizer = new Resizer({ el, camera, renderer })

    scene.add(createAxesHelper(), createGridHelper())
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()

    controls.target.copy(parrot.position) // 将相机对准鹦鹉（默认对准位置，是场景的中心）

    loop.updatables.push(parrot, flamingo, stork)

    scene.add(parrot, flamingo, stork)
  }

  render() {
    renderer.render(scene, camera) // draw a single frame
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}
