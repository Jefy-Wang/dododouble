/** 相机组件 */
import { PerspectiveCamera } from 'three'

export function createCamera(option) {
  const el = option.el
  const aspect = el.clientWidth / el.clientHeight // 宽高比（又名：纵横比、长宽比）
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    aspect, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  )

  camera.position.set(-5, 5, 7)

  return camera
}
