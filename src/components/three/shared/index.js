import { Color } from 'three'

// 执行回调函数的通用方法
export const cbCommonRun = (cb = () => {}, ...args) => {
  if (typeof cb === 'function') cb(...args)
}

// 设置主题
export function setThreeTheme(scene, isDarkTheme = false) {
  scene.background = new Color(!isDarkTheme ? 'skyblue' : '#121212')
}
