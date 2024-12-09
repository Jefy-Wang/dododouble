import Loop from '../../shared/Loop.js'
import Resizer from '../../shared/Resizer.js'
import { createScene } from './components/scene.js'
import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createRenderer } from './systems/renderer.js'
import { createControls } from './systems/controls.js'
import { loadBirds } from './components/birds/birds.js'
import { createStats } from '../../devtools/stats.js'
import { createLilGui } from '../../devtools/lil-gui/index.js'
import { createAxesHelper, createGridHelper } from '../../devtools/helpers.js'

export default class FlyingBird {
  #loop; #resizer; // 通用生产工具库
  #gui; #stats; #gridHelper; #axesHelper; // 辅助开发工具库
  #el; #scene; #camera; #renderer; #controls; // 图形学必备元素

  constructor(el, option = {}) {
    this.#el = el // 画作根节点
    this.#scene = createScene(option) // 创建场景
    this.#camera = createCamera(option) // 创建相机
    this.#renderer = createRenderer(option) // 创建渲染器

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer) // 处理动画循环
    this.#controls = createControls(this.#camera, this.#renderer.domElement) // 相机轨道控制
    this.#loop.updatables.push(this.#controls) // 添加轨道动画

    const light = createLights() // 创建照明

    this.#el.append(this.#renderer.domElement) // 将画布添加到容器中
    this.#scene.add(light.ambientLight, light.mainLight) // 向场景中添加光照
    this.#resizer = new Resizer(this.#el, this.#camera, this.#renderer) // 监听容器尺寸变化

    this.#setDevTools() // 使用开发工具
  }

  // 画作初始逻辑
  async init() {
    const { parrot, flamingo, stork } = await loadBirds()

    this.#controls.target.copy(parrot.position) // 将相机对准鹦鹉（默认对准位置，是场景的中心）

    this.#loop.updatables.push(parrot, flamingo, stork)

    this.#scene.add(parrot, flamingo, stork)
  }

  // 动画循环开始
  start() {
    this.#loop.start()
  }

  // 动画循环结束
  stop() {
    this.#loop.stop()
  }

  // 画作销毁逻辑
  destroy() {
    this.stop()
    this.#renderer.dispose()
    this.#controls.dispose()
    this.#camera.clear()
    this.#scene.clear()
    this.#resizer.destroy()
    this.#destroyDevTools()
  }

  // [ES2022 引入私有字段#] 开发工具的使用
  #setDevTools() {
    if (process.env.NODE_ENV !== 'development') return

    /** 开发模式下，添加性能监控面板 */
    this.#stats = createStats()
    this.#loop.updatables.push(this.#stats)
    this.#el.append(this.#stats.dom)

    /** 开发模式下，创建调试用的图形界面 */
    this.#gui = createLilGui(this.#camera, this.#el)

    /** 开发模式下，添加网格及坐标系 */
    this.#axesHelper = createAxesHelper()
    this.#gridHelper = createGridHelper()
    this.#scene.add(this.#axesHelper, this.#gridHelper)
  }

  // [ES2022 引入私有字段#] 开发工具的销毁
  #destroyDevTools() {
    if (process.env.NODE_ENV !== 'development') return

    this.#gui && this.#gui.destroy()
    this.#stats && this.#stats.end()
    this.#axesHelper && this.#axesHelper.dispose()
    this.#gridHelper && this.#gridHelper.dispose()
  }
}
