import { Cache, Color } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'

// 执行回调函数的通用方法
export const cbCommonRun = (cb = () => {}, ...args) => {
  if (typeof cb === 'function') cb(...args)
}

// 设置主题
export function setThreeTheme(scene, { isDark = false } = {}) {
  if (!scene) return

  scene.background = new Color(!isDark ? 'skyblue' : '#121212') // Three.js 中的颜色，约定通过 new Color 创建
}

// 判断根节点是否可用
export function isElAvailable(el) {
  return el instanceof HTMLElement
}

// 兼容性检查：浏览器是否支持 WebGL
export function isWebGL2Available(el) {
  return new Promise((resolve, reject) => {
    if (WebGL.isWebGL2Available()) {
      resolve()
    } else {
      const warning = WebGL.getWebGL2ErrorMessage()

      if (el && el.appendChild) el.appendChild(warning)

      reject(new Error('Your graphics card does not seem to support WebGL2'))
    }
  })
}

// 开启资源缓存：Cache 是一个全局对象，用于缓存加载的资源（例如纹理、模型、材质等）。
// 通过启用缓存，可以避免重复加载同一资源，从而提高性能。
export function enableCache() {
  Cache.enabled = true // 是否启用资源缓存
}
