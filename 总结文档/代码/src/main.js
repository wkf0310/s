import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment


// Vue.prototype.$moment = moment

Vue.filter('dateFormat', function (date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
})

Vue.config.productionTip = false
require('../mock/index.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
