import { Color } from 'three'

// 执行回调函数的通用方法
export const cbCommonRun = (cb = () => {}, ...args) => {
  if (typeof cb === 'function') cb(...args)
}

// 设置主题
export function setThreeTheme(scene, { isDark = false } = {}) {
  scene.background = new Color(!isDark ? 'skyblue' : '#121212') // Three.js 中的颜色，约定通过 new Color 创建
}
