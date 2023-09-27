import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import './assets/reset.css'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

Vue.use(VueTheMask)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
