import { Clock } from 'three'

const clock = new Clock()

export default class Loop {
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
    const delta = clock.getDelta() // only call the getDelta function once per frame!

    for (const object of this.updatables) {
      if (typeof object.tick === 'function') object.tick(delta)
    }
  }
}
