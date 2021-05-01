import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles/index.css'
import router from './router'
import clickOutside from './library/click-outside'

createApp(App)
  .use(router)
  .use(store)
  .directive('click-outside', clickOutside)
  .mount('#app')
