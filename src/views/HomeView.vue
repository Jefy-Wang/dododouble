<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomeThree from '@/components/home/index.js'

let homeThree = null
const threeEl = ref(null)

async function init() {
  homeThree = new HomeThree(threeEl.value)

  await homeThree.init()

  homeThree.start()
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  homeThree.destroy()
})
</script>

<template>
  <div ref="threeEl" class="home-three-container"></div>
</template>

<style scoped>
.home-three-container {
  height: 100vh;
  width: 100%;
}
</style>
