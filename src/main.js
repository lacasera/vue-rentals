import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueCarousel from 'vue-carousel'
import Cloudinary from 'cloudinary-vue'

import Alert from '@/components/notifications/Alert'
import SideBar from '@/components/layout/SideBar'
import Container from '@/components/Container'
import Loading from '@/components/layout/Loading'

import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

Vue.use(Cloudinary, {
  configuration: {
    cloudName: config('CLOUDINARY_NAME')
  }
})

Vue.use(Vuelidate)
Vue.use(VueCarousel)
Vue.component('alert', Alert)
Vue.component('sidebar', SideBar)
Vue.component('loading', Loading)
Vue.component('container', Container)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
