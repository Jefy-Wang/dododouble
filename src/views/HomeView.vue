<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { setPageLoading } from '@/shared/index.js'
import { isWebGL2Available } from '@/components/three/shared/index.js'
import FlyingBird from '@/components/three/painting/FlyingBird/index.js'

let flyingBird = null
const paintEl = ref()
const canvasEl = ref()

async function init() {
  try {
    await isWebGL2Available(paintEl.value)

    flyingBird = new FlyingBird({ el: paintEl.value, canvas: canvasEl.value })

    flyingBird.init()

    flyingBird.start()
  } finally {
    setPageLoading(false)
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (flyingBird) flyingBird.dispose()
})
</script>

<template>
  <div ref="paintEl" class="paint-three-root">
    <!-- 如果不指定宽高，canvas 的默认宽高为 300px * 150px -->
    <canvas ref="canvasEl" class="paint-three-canvas"></canvas>
  </div>
</template>

<style scoped>
.paint-three-root {
  width: 100%;
  height: 100vh;
  position: relative;

  .paint-three-canvas {
    width: 100%;
    height: 100%;
    display: block; /** canvas 的 display 默认为 inline（行内元素的末尾会有空格）。通过设置 canvas 为块级元素，就能消除这个空格 */
  }
}
</style>
