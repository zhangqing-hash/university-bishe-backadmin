// src/main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia()

const app = createApp(App)

// 注册 Element Plus 插件
app.use(ElementPlus)

// 注册 Pinia
app.use(pinia)

// 注册路由
app.use(router)

// 注册全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局设置默认标题
document.title = '青琦农供'

// 最后挂载
app.mount('#app')
