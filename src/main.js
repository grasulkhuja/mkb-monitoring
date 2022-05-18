import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify/index'
import router from './router'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
// import { connectToWebSocket } from '@/libs/socket'

import '@/libs/axios'
import '@/auth/jwt/useJwt'
import i18n from './i18n'
Vue.config.productionTip = false

// const access = localStorage.getItem('access')
// if (access) connectToWebSocket(access)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
