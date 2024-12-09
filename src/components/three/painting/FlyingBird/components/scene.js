/** 场景组件 */
import { Scene } from 'three'
import { setThreeTheme } from '../../../shared/index.js'

export function createScene({ isDark } = {}) {
  const scene = new Scene()

  setThreeTheme(scene, isDark)

  return scene
}

/**
 * 创建物理大小的场景
 *
 * three.js 中的大小单位是米（约定）
 *
 * 我们之前创建的 2×2×2 的立方体每边长为两米
 * camera.far = 100 意味着我们可以看到一百米的距离
 * camera.near = 0.1 意味着距离相机不到十厘米的物体将不可见
 *
 * */

/***
 * 直接照明 DirectionalLight => 阳光
 * 点照明   PointLight => 灯泡
 * RectAreaLight => 条形照明或明亮的窗户
 * SpotLight => 聚光灯
 *
 * 默认情况下禁用阴影
 * */
