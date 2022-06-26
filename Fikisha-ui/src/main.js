import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import listener from './mixin/listener/listener'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
window.Event = new Vue();
Vue.config.productionTip = false
Vue.use(Toast)


new Vue({
  router,
  store,
  vuetify,
  mixins: [listener],
  render: h => h(App)
}).$mount('#app')
