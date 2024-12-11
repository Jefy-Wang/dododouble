/** 立方体组件 */
import {
  Mesh,
  MathUtils,
  BoxGeometry,
  TextureLoader,
  MeshStandardMaterial
} from 'three'

// 创建材质（带纹理映射）
function createMaterial() {
  // create a textures loader.
  const textureLoader = new TextureLoader()

  // load a textures
  const texture = textureLoader.load(`${import.meta.env.BASE_URL}textures/uv-test-bw.png`)

  return new MeshStandardMaterial({
    map: texture // 意指 colorMap
  }) // color 与 map 参数不能同时设置
}

export function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)
  // create a default (white) Basic material
  const material = createMaterial()
  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  const radiansPerSecond = MathUtils.degToRad(30)

  // this method will be called once per frame
  // increase the cube's rotation each frame
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }

  return cube
}
