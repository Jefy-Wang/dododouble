import '@/assets/style/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setPageLoading } from '@/shared'

import App from './App.vue'
import router from './router'

document.oncontextmenu = () => false // 禁止浏览器右键功能

setPageLoading() // 开启页面加载效果

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
