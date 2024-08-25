<script setup>
import HomeThree from '@/components/home/index.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { setPageLoading } from '@/shared/index.js'
import Footer from '@/components/layout/Footer.vue'

// 普通变量
let homeThree = null

// 状态 State
const threeEl = ref(null)

// 行为 Action
const init = async () => {
  homeThree = new HomeThree(threeEl.value)

  await homeThree.init()

  homeThree.start()

  setPageLoading(false)
}

// 生命周期 LifeCycle
onMounted(() => {
  init()
})

onUnmounted(() => {
  homeThree.destroy()
})
</script>

<template>
  <div ref="threeEl" class="home-three-container"></div>

  <Footer class="three-footer" :delay="false"></Footer>
</template>

<style scoped>
.home-three-container {
  height: 100vh;
  width: 100%;
}

.three-footer {
  position: absolute;
  bottom: 0;
}
</style>
