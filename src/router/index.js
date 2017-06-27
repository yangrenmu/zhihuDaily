import Vue from 'vue';
import Router from 'vue-router';
import homePage from '../components/homePage/homePage.vue';
import article from '../components/article/article.vue';
import comment from '../components/comment/comment.vue';
import themes from '../components/theme/theme.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/home',
    name: 'homePage',
    component: homePage
  }, {
    // 动态路由，不同路由用同一个组件来渲染
    path: '/article/(\\d+)',
    name: 'article',
    component: article
  }, {
    path: '/article/comment',
    name: 'comment',
    component: comment
  }, {
    path: '/themes/:id',
    name: 'themes',
    component: themes
  }]
});
