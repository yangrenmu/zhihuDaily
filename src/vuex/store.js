import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    articleId: '',
    showSide: false,
    homeHidden: false,
    currentIndex: -1,
    themeList: [{
      id: '',
      thumbnail: '',
      name: ''
    }]
  },
  getters: {
    articleId: state => state.articleId,
    showSide: state => state.showSide,
    homeHidden: state => state.homeHidden,
    currentIndex: state => state.currentIndex,
    themeList: state => state.themeList
  },
  mutations: {
    setArticleId(state, id) {
      state.articleId = id;
    },
    setShowSideBar(state) {
      state.showSide = !state.showSide;
    },
    setHomeHidden(state) {
      state.homeHidden = !state.homeHidden;
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    setThemeList(state, list) {
      state.themeList = list;
    }
  }
});
