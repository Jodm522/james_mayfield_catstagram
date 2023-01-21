import { createApp } from 'vue'
import { Vue3Mq } from "vue3-mq";
import { vfmPlugin } from 'vue-final-modal'

import {createStore} from 'vuex'
import App from './App.vue'

import authModule from "./store/auth/index.js"


import './assets/main.css'
const store = createStore({
 modules:{
    auth:authModule,
 }
})
const app = createApp(App)
app.use(store)
app.use(vfmPlugin)
app.use(Vue3Mq, { 
    // Using VMQ to set device widths for specific renderings (Phone:0, tablet:768, laptop:1370, desktop:1906)
    preset: 'devices'
});
app.mount('#app')
