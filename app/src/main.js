import Vue from 'vue'
import VueToast from 'vue-toast-notification';
import VueMeta from 'vue-meta';
import axios from 'axios'

const App = require('./App.vue').default

import 'vue-toast-notification/dist/theme-default.css';

Vue.prototype.$http = axios

Vue.use(VueToast);

Vue.use(VueMeta);

Vue.config.productionTip = false;

Vue.filter('currency', function (value) {
  return 'R$' + parseFloat(value).toFixed(2).replace('.', ',')
});


new Vue({
  render: h => h(App),
}).$mount('#app')
