import GIT from './build/git'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import legacyPlugin from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    zipPack({
      outDir: './' // 将 dist 目录，压缩为 dist.zip（默认在 dist-zip 目录下，改为存放在项目根目录下）
    }), // https://github.com/7th-Cyborg/vite-plugin-zip-pack#readme
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024 * 10, // 文件体积阈值 10KB
      algorithm: 'gzip',
      ext: '.gz'
    }), // gzip 静态资源压缩
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '肚肚兔', // 网站名称
          buildTime: GIT.buildTime, // 打包时间
          commitMessage: GIT.commitMessage // 提交信息
        }
      }
    }), // 处理 HTML 文件
    legacyPlugin({
      targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向 IE11 时需要此插件
    }) // IE和旧版chrome兼容
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
