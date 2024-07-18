import './assets/main.css'
import DataVVue3 from '@kjgl77/datav-vue3'
import { createApp } from 'vue'
import App from './App.vue'
import 'echarts-gl'
var app=createApp(App)
app.use(DataVVue3)
app.mount('#app')
