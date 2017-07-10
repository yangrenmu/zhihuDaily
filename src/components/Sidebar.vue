<template>
  <div class="sideBar">
    <transition name='fade'>
      <div v-show="showSide" class="sideBar-content">
        <div class="sideBar-box">
          <div class="sideBar-header">
            <div class="user">
              <div class="avatar">
                <img class="image" src="https://avatars0.githubusercontent.com/u/18193168">
              </div>
              <span class="name">yangrenmu</span>
              <div class="address">
                <i class="icon-github"></i>
                <a class="link" href="https://github.com/yangrenmu">https://github.com/yangrenmu</a>
              </div>
            </div>
          </div>
          <div class="themeList">
            <div @click="showBackground()" :class="{'background' : (currentIndex === -1)}" class="home">
              <i class="icon-home"></i>
              <span class="text">首页</span>
            </div>
            <div v-for="(item, index) in themeList" @click="showBackground(index)" :class="{'background' : (index === currentIndex)}" class="themes">
              <span class="text">{{item.name}}</span>
              <i class="icon-add"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name='fade-mask'>
      <div @click="hideSide" v-show="showSide" class="mask"></div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import {
  mapGetters
} from 'vuex';
export default {
  data: function() {
    return {
      themeList: '',
      currentIndex: -1
    };
  },
  created() {
    this.axios.get('http://zhihuapi.herokuapp.com/api/4/themes').then((res) => {
      this.themeList = res.data.others;
    });
  },
  computed: {
    ...mapGetters([
      'showSide'
    ])
  },
  methods: {
    showBackground(index) {
      if (index >= 0) {
        this.currentIndex = index;
      } else {
        this.currentIndex = -1;
      }
      if (this.currentIndex === -1) {
        this.$router.push('/home');
        this.hideSide();
      } else {
        this.$router.push('/themes/' + this.themeList[index].name);
        this.$store.commit('setCurrentIndex', index);
        this.$store.commit('setThemeList', this.themeList);
        this.hideSide();
      }
    },
    hideSide() {
      this.$store.commit('setShowSideBar');
      this.$store.commit('setHomeHidden');
    }
  }
};
</script>
<style lang="scss" type="text/css">
.sideBar {
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  .sideBar-content {
    position: absolute;
    top: 0;
    width: 80%;
    height: 100%;
    max-width: 538px;
    font-size: 0;
    background: rgb(254, 254, 254);
    z-index: 10;
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all .3s ease-out;
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave-active {
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
    }
    .sideBar-box {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
      }
      .sideBar-header {
        padding: 20px 0 20px 10px;
        width: 100%;
        box-sizing: border-box;
        background: rgb(53, 157, 218);
        .user {
          .avatar {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            border-radius: 50%;
            overflow: hidden;
            .image {
              width: 100%;
            }
          }
          .name {
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
            font-size: 16px;
            color: #fff;
          }
        }
        .address {
          margin-top: 5px;
          .icon-github {
            display: inline-block;
            vertical-align: middle;
            font-size: 24px;
          }
          .link {
            display: inline-block;
            margin-left: 10px;
            vertical-align: middle;
            font-size: 16px;
            color: #fff;
          }
        }
      }
      .themeList {
        font-size: 0px;
        .home {
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: rgb(53, 157, 218);
          &.background {
            background: rgba(240, 240, 240, 0.9);
          }
          .icon-home {
            padding: 0 20px;
            font-size: 20px;
          }
        }
        .themes {
          padding: 0 10px;
          height: 50px;
          line-height: 50px;
          &.background {
            background: rgba(240, 240, 240, 0.9);
          }
          .text {
            font-size: 16px;
          }
          .icon-add {
            float: right;
            margin-right: 40px;
            color: rgb(190, 190, 190);
          }
        }
      }
    }
  }
  .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 768px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 6;
    &.fade-mask-enter-active,
    &.fade-mask-leave-active {
      transition: all .3s ease-out;
      opacity: 1;
    }
    &.fade-mask-enter,
    &.fade-mask-leave-active {
      opacity: 0;
    }
  }
}
</style>
