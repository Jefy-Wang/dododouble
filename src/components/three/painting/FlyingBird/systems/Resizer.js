import { cbCommonRun } from '../../../shared/index.js'

let myCamera, myRenderer

const myResize = (container) => {
  myCamera.aspect = container.clientWidth / container.clientHeight // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  myCamera.updateProjectionMatrix() // 投影矩阵

  myRenderer.setSize(container.clientWidth, container.clientHeight) // 重置渲染器输出画布 canvas 尺寸
  myRenderer.setPixelRatio(window.devicePixelRatio) // set the pixel ratio (for mobile devices)
}

export default class Resizer {
  constructor({ el, camera, renderer } = {}) {
    myCamera = camera
    myRenderer = renderer

    myResize(el)

    window.addEventListener('resize', () => {
      myResize(el)

      cbCommonRun(this.onresize)
    })
  }

  // 自定义行为
  onresize() {}
}
