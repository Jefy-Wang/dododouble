import { WebGLRenderer } from 'three'

export function createRenderer(props) {
  const renderer = new WebGLRenderer({
    canvas: props.canvas,
    antialias: true // 启用抗锯齿
  })

  renderer.physicallyCorrectLights = true // 启用物理正确照明

  return renderer
}
