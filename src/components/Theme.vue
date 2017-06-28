<template>
  <div :class="{'home-hidden' : homeHidden}" class="theme">
    <header class="header">
      <i @click="showSideBar" class="icon-menu"></i>
      <div class="home">
        <span class="text">{{themeList[currentIndex].name}}</span>
      </div>
      <div class="more">
        <i class="icon-follow"></i>
      </div>
    </header>
    <section class="section">
      <figure class="figure">
        <span class="title">{{themeList[currentIndex].description}}</span>
        <img class="image" :src="themeList[currentIndex].thumbnail">
        <div class="mask"></div>
      </figure>
      <article class="article-list">
        <div class="editor">
          <span class="text">主编</span>
          <div v-for="item in editors" class="avatar">
            <img class="image" :src="item.avatar">
          </div>
        </div>
        <div v-for="item in themeStories" class="article">
          <span class="text">{{item.title}}</span>
          <div v-if="item.images" class="image-box">
            <img v-if="item.images" class="image" :src="item.images">
          </div>
        </div>
      </article>
    </section>
    <sideBar></sideBar>
  </div>
</template>
<script type="text/javascript">
import sideBar from './Sidebar.vue';
import {
  mapGetters
} from 'vuex';
export default {
  data: function() {
    return {
      themeStories: '',
      editors: ''
    };
  },
  created() {
    if (this.currentIndex >= 0) {
      this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/' + this.themeList[this.currentIndex].id).then((res) => {
        this.themeStories = res.data.THEMEDES.stories;
        this.editors = res.data.THEMEDES.editors;
      });
    }
  },
  watch: {
    currentIndex: function() {
      if (this.currentIndex >= 0) {
        this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/' + this.themeList[this.currentIndex].id).then((res) => {
          this.themeStories = res.data.THEMEDES.stories;
          this.editors = res.data.THEMEDES.editors;
        });
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'themeList',
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
    sideBar
  }
};
</script>
<style lang="scss" type="text/css">
.theme {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 0;
  background: rgba(240, 240, 240, 0.8);
  &.home-hidden {
    height: 100vh;
    overflow: hidden;
  }
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
    box-sizing: border-box;
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
      flex: 0 0 50px;
      width: 50px;
      float: right;
      text-align: center;
      .icon-follow,
      .icon-unfollow {
        font-size: 24px;
      }
    }
  }
  .section {
    width: 100%;
    background: rgb(240, 240, 240);
    .figure {
      position: relative;
      margin-top: 50px;
      width: 100%;
      overflow: hidden;
      @media (max-width: 320px) {
        height: 180px;
      }
      @media (min-width: 320px) and (max-width: 520px) {
        height: 200px;
      }
      @media (min-width: 520px) and (max-width: 640px) {
        height: 220px;
      }
      @media (min-width: 640px) {
        height: 280px;
      }
      .image {
        width: 100%;
      }
      .title {
        position: absolute;
        bottom: 20px;
        padding: 0 20px;
        color: #fff;
        font-size: 16px;
      }
      .mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: line-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
        z-index: 1;
      }
    }
    .article-list {
      padding: 0 10px;
      .editor {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        .text {
          flex: 0 0 50px;
          font-size: 16px;
        }
        .avatar {
          flex: 0 0 40px;
          text-align: center;
          .image {
            width: 30px;
            border-radius: 50%;
          }
        }
      }
      .article {
        display: flex;
        width: 100%;
        min-height: 60px;
        padding: 10px 14px;
        margin-top: 5px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 1px 1px 1px #ccc;
        background: #fff;
        .text {
          flex: 1;
          line-height: 20px;
          font-size: 16px;
        }
        .image-box {
          flex: 0 0 auto;
          height: 75px;
          max-width: 75px;
          overflow: hidden;
          .image {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
