import { HemisphereLight, DirectionalLight } from 'three'

export function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategray',
    3,
  )

  const mainLight = new DirectionalLight('white', 2) // 创建一个直接照明（颜色，强度）

  mainLight.position.set(10, 10, 10) // 移动灯 move the light right, up, and towards us

  return {
    mainLight,
    ambientLight,
  }
}

/**
 * 所有 three.js 灯都有颜色 color 和 强度 intensity 设置，继承自 Light 基类
 * 灯光和目标的默认位置都是我们场景的中心 (0, 0, 0)
 * */
