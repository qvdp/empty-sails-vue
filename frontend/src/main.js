import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr'
import en from 'vee-validate/dist/locale/en'
import router from './router/router'
import store from './store/store'
import i18n from './i18n'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    fr,
    en
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
