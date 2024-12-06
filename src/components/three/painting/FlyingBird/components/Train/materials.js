import { MeshStandardMaterial } from 'three'

// 创建材质
export function createMaterials() {
  // 车身
  const body = new MeshStandardMaterial({
    color: 'firebrick',
    flatShading: true
  })

  // 车轮和烟囱
  const detail = new MeshStandardMaterial({
    color: 'darkslategray',
    flatShading: true
  })

  return {
    body,
    detail
  }
}
