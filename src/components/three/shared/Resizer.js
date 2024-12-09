import debounce from 'lodash/debounce'
import { cbCommonRun } from './index.js'
import ResizeObserver from 'resize-observer-polyfill'

// 容器尺寸监听器
export default class Resizer {
  #el; #camera; #renderer;

  constructor(el, camera, renderer) {
    this.#el = el
    this.#camera = camera
    this.#renderer = renderer

    this.resizeDelay = 0
    this.bindResizeObserver()
  }

  // 监听元素尺寸
  bindResizeObserver() {
    const onSizeChange = debounce(({ width, height } = {}) => {
      if (!width || !height) return

      cbCommonRun(this.#resize, { width, height, camera: this.#camera, renderer: this.#renderer })
    }, this.resizeDelay) // 响应尺寸变化

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect

        onSizeChange({ width, height })
      }
    })

    this.resizeObserver.observe(this.#el)
  }

  // 取消监听元素
  cleanResizeObserver() {
    this.resizeObserver.unobserve(this.#el)
    this.resizeObserver = null
  }

  // 取消元素监听
  destroy() {
    this.cleanResizeObserver()
  }

  // [ES2022 引入私有字段#] 响应尺寸变化
  #resize({ width, height, camera, renderer } = {}) {
    if (!width || !height || !camera || !renderer) return

    camera.aspect = width / height // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.updateProjectionMatrix() // 投影矩阵

    renderer.setSize(width, height) // 重置渲染器输出画布 canvas 尺寸
    renderer.setPixelRatio(window.devicePixelRatio) // set the pixel ratio (for mobile devices)
  }
}
