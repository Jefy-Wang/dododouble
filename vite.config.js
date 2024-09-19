import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import GIT from './build/git'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import closePort from './build/close-port.js'
import legacyPlugin from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 11447,
    strictPort: true // 若端口已被占用则会直接退出
  },
  preview: {
    host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址
    port: 9527, // 固定端口
    strictPort: true // 若端口已被占用则会直接退出
  },
  define: {
    'process.env.GIT': JSON.stringify(GIT),
  }, // 定义全局常量替换方式
  build: {
    sourcemap: false, // 关闭 sourcemap
    chunkSizeWarningLimit: 1500,
    minify: 'terser', // 混淆器(代码压缩和优化)，terser 构建后文件体积更小
    terserOptions: {
      compress: {
        drop_console: true, // 清除 console
        drop_debugger: true, // 清除 debugger
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString() // 超大静态资源拆分
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    closePort(),
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
