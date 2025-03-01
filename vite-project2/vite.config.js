import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5566,
    open: true, // 默认打开浏览器
    hmr: true, // 开启热更新
  },
  plugins: [vue()],
})
