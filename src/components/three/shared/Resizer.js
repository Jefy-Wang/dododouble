import debounce from 'lodash/debounce'
import ResizeObserver from 'resize-observer-polyfill'
import { cbCommonRun, existFalsyKey } from './index.js'

// 容器尺寸监听器
export default class Resizer {
  #el; #camera; #renderer;

  constructor(el, camera, renderer) {
    this.#el = el
    this.#camera = camera
    this.#renderer = renderer

    this.resizeDelay = 0
    this.#bindResizeObserver()
  }

  // 取消元素监听
  dispose() {
    this.#cleanResizeObserver()
  }

  // [ES2022 引入私有字段#] 监听元素尺寸
  #bindResizeObserver() {
    const onSizeChange = debounce(({ width, height } = {}) => {
      if (!width || !height) return

      cbCommonRun(this.#resize, { width, height, camera: this.#camera, renderer: this.#renderer, instance: this })
    }, this.resizeDelay) // 响应尺寸变化

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect

        onSizeChange({ width, height })
      }
    })

    this.resizeObserver.observe(this.#el)
  }

  // [ES2022 引入私有字段#] 取消监听元素
  #cleanResizeObserver() {
    this.resizeObserver.unobserve(this.#el)
    this.resizeObserver = null
  }

  // [ES2022 引入私有字段#] 响应尺寸变化
  #resize(options = {}) {
    if (existFalsyKey(options)) return

    // 因为只有 canvas 的显示尺寸变化时，宽高比才变化！所以我们此时才设置摄像机的宽高比
    // 以保证渲染的分辨率应该是和 canvas 的显示尺寸一样
    if (options.instance.#resizeRendererToDisplaySize(options.renderer)) {
      const canvas = options.renderer.domElement

      options.camera.aspect = canvas.clientWidth / canvas.clientHeight // 设置观察范围宽高比
      options.camera.updateProjectionMatrix() //  更新摄像机投影矩阵
    }
  }

  // [ES2022 引入私有字段#] 将渲染尺寸设为显示尺寸
  #resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const DPR = window.devicePixelRatio
    const width = Math.floor(canvas.clientWidth * DPR) // 计算 canvas 渲染尺寸-宽
    const height = Math.floor(canvas.clientHeight * DPR) // 计算 canvas 渲染尺寸-高
    const needResize = canvas.width !== width || canvas.height !== height // 是否更新渲染尺寸

    /**
     * 检查渲染尺寸与显示尺寸，是否有差异
     * 有差异时将渲染尺寸设为显示尺寸！
     * 此方案胜于 renderer.setPixelRatio 方案
     */
    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }
}
