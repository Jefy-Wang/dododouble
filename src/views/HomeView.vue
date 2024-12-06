<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FlyingBird from '@/components/three/painting/FlyingBird/index.js'

let flyingBird = null
const threeEl = ref()

async function init() {
  flyingBird = new FlyingBird(threeEl.value)

  await flyingBird.init()

  flyingBird.start()
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  flyingBird.destroy()
})
</script>

<template>
  <div ref="threeEl" class="paint-three-root"></div>
</template>

<style scoped>
.paint-three-root {
  height: 100vh;
  width: 100%;
}
</style>
