import { WebGLRenderer } from 'three'

export function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true }) // 启用抗锯齿

  renderer.physicallyCorrectLights = true // 启用物理正确照明

  return renderer
}
