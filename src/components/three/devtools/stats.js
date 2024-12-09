import Stats from 'three/examples/jsm/libs/stats.module.js'

// 性能监控工具：实时显示 FPS 和内存使用情况
export function createStats() {
  const stats = new Stats()

  stats.tick = () => stats.update()

  // 修改监控面板样式
  if (stats.dom && stats.dom.style) stats.dom.style.position = 'absolute'

  return stats
}
