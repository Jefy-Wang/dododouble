<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { setPageLoading } from '@/shared/index.js'
import { isWebGL2Available } from '@/components/three/shared/index.js'
import FlyingBird from '@/components/three/painting/FlyingBird/index.js'

let flyingBird = null
const paintEl = ref()

async function init() {
  try {
    await isWebGL2Available(paintEl.value)

    flyingBird = new FlyingBird({ el: paintEl.value })

    await flyingBird.init()

    flyingBird.start()
  } finally {
    setPageLoading(false)
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (flyingBird) flyingBird.destroy()
})
</script>

<template>
  <div ref="paintEl" class="paint-three-root"></div>
</template>

<style scoped>
.paint-three-root {
  height: 100vh;
  width: 100%;
  position: relative;
}
</style>
