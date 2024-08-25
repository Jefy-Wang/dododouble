import {
  Mesh
} from 'three'
import { createMaterials } from './materials.js'
import { createGeometries } from './geometries.js'

// 创建网格
export function createMeshes() {
  const geometries = createGeometries()
  const materials = createMaterials()
  const cabin = new Mesh(geometries.cabin, materials.body) // 货舱网格
  const chimney = new Mesh(geometries.chimney, materials.detail) // 烟囱网格
  const nose = new Mesh(geometries.nose, materials.body) // 鼻子网格

  cabin.position.set(1.5, 1.4, 0)
  chimney.position.set(-2, 1.9, 0)
  nose.position.set(-1, 1, 0)
  nose.rotation.z = Math.PI / 2

  const smallWheelRear = new Mesh(geometries.wheel, materials.detail) // 后轮网格
  smallWheelRear.position.y = 0.5
  smallWheelRear.rotation.x = Math.PI / 2

  const smallWheelCenter = smallWheelRear.clone() // 中轮网格（由后轮克隆而来）
  smallWheelCenter.position.x = -1

  const smallWheelFront = smallWheelRear.clone() // 前轮网格（由后轮克隆而来）
  smallWheelFront.position.x = -2

  const bigWheel = smallWheelRear.clone() // 大后轮网格（由后轮克隆而来）
  bigWheel.position.set(1.5, 0.9, 0)
  bigWheel.scale.set(2, 1.25, 2)

  return {
    nose,
    cabin,
    chimney,
    bigWheel,
    smallWheelRear,
    smallWheelFront,
    smallWheelCenter
  }
}
