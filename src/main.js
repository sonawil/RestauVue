import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios' //moncef
import App from './App.vue'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.css' 
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)

const pinia = createPinia() //moncef
app.use(pinia)
app.use(router)

app.config.globalProperties.$http = axios //moncef

app.mount('#app')
