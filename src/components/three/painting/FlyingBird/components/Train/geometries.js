import {
  BoxGeometry,
  CylinderGeometry
} from 'three'

// 创建几何体
export function createGeometries() {
  const cabin = new BoxGeometry(2, 2.25, 1.5) // 火车货舱
  const nose = new CylinderGeometry(0.75, 0.75, 3, 12) // 火车鼻子
  const wheel = new CylinderGeometry(0.4, 0.4, 1.75, 16) // 车轮
  const chimney = new CylinderGeometry(0.3, 0.1, 0.5) // 烟囱

  return {
    nose,
    wheel,
    cabin,
    chimney
  }
}
