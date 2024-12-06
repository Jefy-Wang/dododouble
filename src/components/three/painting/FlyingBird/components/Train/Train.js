import {
  Group,
  MathUtils
} from 'three'
import { createMeshes } from './meshes.js'
import { createMaterials } from './materials.js'
import { createGeometries } from './geometries.js'

const wheelSpeed = MathUtils.degToRad(24)

// 创建 Train 类（继承自 Group 类）
export default class Train extends Group {
  constructor() {
    super()

    this.meshes = createMeshes() // 创建了成员变量 meshes

    this.add(
      this.meshes.nose,
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.smallWheelRear,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.bigWheel
    )
  }

  tick(delta) {
    this.meshes.bigWheel.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta
  }
}

/** 通过继承 Group 类，一旦我们创建了一个火车，就可以将它直接添加到我们的场景中
 * const train = new Train()
 *
 * train.add(mesh)
 *
 * scene.add(train)
 */
