// 执行回调函数
export function fnCommonRun(fn, ...args) {
  if (typeof fn === 'function') fn(...args)
}

// 是否为宽松假值
export const isLooseFalse = (v) => {
  return !!(!v && v !== 0)
}

// 是否为宽松真值
export const isLooseTruth = (v) => {
  return !!(v || v === 0)
}

// 设置页面加载
export function setPageLoading(loading = true, text = '3D 引擎计算中...') {
  const Timeout = 120
  const LoadingRootEl = document.getElementById('page-loading__container')
  const LoadingTextEl = document.getElementById('page-loading__text')

  LoadingTextEl.textContent = text

  if (loading) {
    LoadingRootEl.style.opacity = '1'
    LoadingRootEl.style.zIndex = '99999'
    console.log('页面级 Loading 进行中')
  } else {
    LoadingRootEl.style.opacity = '0'
    LoadingRootEl.style.animation = `gradual-hide ${Timeout}ms linear 1`

    setTimeout(() => {
      LoadingRootEl.style.zIndex = '-9999'
      console.log('页面级 Loading 已完成')
    }, Timeout)
  }
}
