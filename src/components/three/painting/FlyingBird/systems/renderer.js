import { WebGLRenderer } from 'three'

export function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true }) // 启用抗锯齿

  // 启用物理正确照明
  renderer.physicallyCorrectLights = true

  return renderer
}
