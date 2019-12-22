/* eslint-disable import/first */

import 'vuetify/dist/vuetify.min.css';
import 'es6-promise/auto';
import Vue from 'vue';
import Vuetify from 'vuetify';


import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify);

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
