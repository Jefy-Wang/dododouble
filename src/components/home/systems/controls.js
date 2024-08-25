import { OrbitControls } from 'three/addons'

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  controls.enableDamping = true

  controls.tick = () => controls.update()

  return controls
}
