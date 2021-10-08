import Vue from 'vue'
import App from './App.vue'
import liToast from '../packages'
Vue.use(liToast)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
