import {
  Mesh,
  Group,
  MathUtils,
  SphereGeometry,
  MeshStandardMaterial
} from 'three'

// 创建网格组
export function createMeshGroup() {
  // 组是一只逻辑概念，本身不可见
  const group = new Group()
  const geometry = new SphereGeometry(0.25, 16, 16)
  const material = new MeshStandardMaterial({ color: 'indigo', flatShading: true }) // flatShading：是否开启混合相邻面
  const protoSphere = new Mesh(geometry, material) // 球体原型：意味着将以其为模板，克隆若干

  group.add(protoSphere) // add the protoSphere to the group

  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone() // 以 protoSphere 为原型，进行克隆

    sphere.position.x = Math.cos(2 * Math.PI * i)
    sphere.position.y = Math.sin(2 * Math.PI * i)
    sphere.scale.multiplyScalar(0.01 + i)

    group.add(sphere)
  }

  group.scale.multiplyScalar(2) // every sphere inside the group will be scaled

  const radiansPerSecond = MathUtils.degToRad(30)

  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSecond
  }

  return group
}
