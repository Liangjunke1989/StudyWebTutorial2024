import {defineConfig}  from "vite";
import vue from '@vitejs/plugin-vue';
import path from "path";

function resolve(url)
{
  return path.resolve(__dirname, url);
}

export default defineConfig({
  resolve: {
      //路径别名
    alias: {
      '@': path.resolve( './src')
    },
      //省略文件后缀
      extensions: ['.js', '.json', '.vue', '.mjs']
  },
  plugins: [vue()],
});

