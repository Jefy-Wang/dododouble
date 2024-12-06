import {
  AxesHelper,
  GridHelper
} from 'three'

// 坐标系助手
export function createAxesHelper() {
  // 红色 R：X轴
  // 绿色 G：Y轴
  // 蓝色 B：Z轴
  const helper = new AxesHelper(3)

  helper.position.set(-3.5, 0, -3.5)

  return helper
}

// 网格助手
export function createGridHelper() {
  return new GridHelper(6)
}
