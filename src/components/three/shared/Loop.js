import { Clock } from 'three'

// 处理所有的循环逻辑和动画系统
export default class Loop {
  #clock =  new Clock() // 时钟器

  constructor(camera, scene, renderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = this.#clock.getDelta() // only call the getDelta function once per frame!

    for (const object of this.updatables) {
      if (typeof object.tick === 'function') object.tick(delta)
    }
  }
}
