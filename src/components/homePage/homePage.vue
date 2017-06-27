<template>
  <div :class="{'home-hidden' : homeHidden}" class="homePage">
    <div class="homePage-content">
      <header class="header">
        <i @click="showSideBar" class="icon-menu"></i>
        <div class="home">
          <span class="text">首页</span>
        </div>
        <div class="more">
          <i class="icon-bell"></i>
          <i class="icon-more"></i>
        </div>
      </header>
      <sideBar></sideBar>
      <swiper ref="swiper"></swiper>
      <articleList></articleList>
    </div>
  </div>
</template>
<script>
import swiper from '../swiper/swiper';
import articleList from '../articleList/articleList';
import sideBar from '../sideBar/sideBar';
import {
  mapGetters
} from 'vuex';
export default {
  activated() {
      // 切回首页时候，重新初始化轮播图
      this.$refs.swiper.startPlay();
    },
    computed: {
      ...mapGetters([
        'homeHidden'
      ])
    },
  methods: {
      showSideBar() {
        this.$store.commit('setShowSideBar');
        this.$store.commit('setHomeHidden');
      }
    },
    components: {
      swiper,
      articleList,
      sideBar
    }
};
</script>
<style lang="scss">
.homePage {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  background: rgba(240, 240, 240, 0.8);
  &.home-hidden {
    height: 100vh;
    overflow: hidden;
  }
  .homePage-content {
    width: 100%;
    .header {
      display: flex;
      position: fixed;
      top: 0;
      margin: 0 auto;
      width: 100%;
      max-width: 768px;
      height: 50px;
      align-items: center;
      color: #fff;
      z-index: 3;
      background: rgb(53, 157, 218);
      .icon-menu {
        flex: 0 0 50px;
        width: 50px;
        padding: 15px 0;
        text-align: center;
        font-size: 20px;
      }
      .home {
        flex: 1;
        padding-left: 10px;
        .text {
          font-size: 16px;
        }
      }
      .more {
        flex: 0 0 100px;
        width: 100px;
        float: right;
        display: flex;
        .icon-bell,
        .icon-more {
          flex: 0 0 50px;
          width: 50px;
          text-align: center;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
