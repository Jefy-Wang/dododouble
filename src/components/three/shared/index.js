import { Color } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'

// 执行回调函数的通用方法
export const cbCommonRun = (cb = () => {}, ...args) => {
  if (typeof cb === 'function') cb(...args)
}

// 设置主题
export function setThreeTheme(scene, { isDark = false } = {}) {
  scene.background = new Color(!isDark ? 'skyblue' : '#121212') // Three.js 中的颜色，约定通过 new Color 创建
}

// 兼容性检查：浏览器是否支持 WebGL
export function isWebGL2Available(el) {
  return new Promise((resolve, reject) => {
    if (WebGL.isWebGL2Available()) {
      resolve()
    } else {
      const warning = WebGL.getWebGL2ErrorMessage()

      if (el && el.appendChild) el.appendChild(warning)

      reject()
    }
  })
}
