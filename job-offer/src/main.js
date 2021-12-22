import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import '../style.css' //tailwind config
import router from "./router/router"; //vue-router
import Global from './Global.vue';
// import Antd from 'ant-design-vue'; //ant-design
// import 'ant-design-vue/dist/antd.css'; //ant-design
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css'

const app = createApp(App)
app.config.productionTip = false;
app.use(router)
app.use(Global)
// app.use(Antd)
app.use(Markdown)
app.mount('#app')
// app.use(router)
