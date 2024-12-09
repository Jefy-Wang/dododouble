import debounce from 'lodash/debounce'
import { cbCommonRun } from './index.js'
import ResizeObserver from 'resize-observer-polyfill'

let myCamera, myRenderer

export default class Resizer {
  constructor({ el, camera, renderer } = {}) {
    myCamera = camera
    myRenderer = renderer

    this.observeEl = el
    this.resizeDelay = 0
    this.bindResizeObserver()
  }

  // 响应尺寸变化
  onresize(width, height) {
    if (!width || !height) return

    myCamera.aspect = width / height // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    myCamera.updateProjectionMatrix() // 投影矩阵

    myRenderer.setSize(width, height) // 重置渲染器输出画布 canvas 尺寸
    myRenderer.setPixelRatio(window.devicePixelRatio) // set the pixel ratio (for mobile devices)
  }

  // 监听元素尺寸
  bindResizeObserver() {
    const onSizeChange = debounce(({ width, height } = {}) => {
      if (!width || !height) return

      cbCommonRun(this.onresize, width, height)
    }, this.resizeDelay) // 响应尺寸变化

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect

        onSizeChange({ width, height })
      }
    })

    this.resizeObserver.observe(this.observeEl)
  }

  // 取消监听元素
  cleanResizeObserver() {
    this.resizeObserver.unobserve(this.observeEl)
    this.resizeObserver = null
  }

  // 取消元素监听
  destroy() {
    this.cleanResizeObserver()
  }
}
