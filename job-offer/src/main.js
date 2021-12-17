import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import '../style.css' //tailwind config
import router from "./router/router"; //vue-router
import Global from './Global.vue';
// import Antd from 'ant-design-vue'; //ant-design
// import 'ant-design-vue/dist/antd.css'; //ant-design

const app = createApp(App)
app.config.productionTip = false;
app.use(router)
app.use(Global)
// app.use(Antd)
app.mount('#app')
// app.use(router)
