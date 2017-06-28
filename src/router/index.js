import Vue from 'vue';
import Router from 'vue-router';
import homePage from '../components/HomePage.vue';
import article from '../components/Article.vue';
import comment from '../components/Comment.vue';
import themes from '../components/Theme.vue';

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
