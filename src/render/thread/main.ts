import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import '@/assets/css/reset.css'
import '@/assets/css/common.css'
import '@/assets/css/element-plus.css'
import '@/assets/css/components.css'
import '@/assets/css/thread.css'
import '@/assets/fonts/iconfont.css'

import 'element-plus/dist/index.css'

// vue 图片预览
import "viewerjs/dist/viewer.css"
import VueViewer from 'v-viewer'
import InitialValue from '@/constant/initial_value'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueViewer)
VueViewer.setDefaults(InitialValue.getVueViewerOptions())
app.mount('#app')