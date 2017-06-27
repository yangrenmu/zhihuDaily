// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// 引入路由
import router from './router';
// 引入 axios
import Axios from 'axios';
import VueAxios from 'vue-axios';
// 引入 vuex
import store from './vuex/store.js';
import './common/css/iconfont.css';
import '../static/css/reset.css';

// Vue.config.productionTip = false

Vue.use(VueAxios, Axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
router.push('/home');
let indexScrollTop = 0;
router.beforeEach((to, from, next) => {
  if (from.path === '/home') {
    indexScrollTop = document.body.scrollTop;
  }
  if (to.path === '/home') {
    window.scrollTo(0, indexScrollTop);
  }
  next();
});
