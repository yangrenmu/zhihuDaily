<template>
  <div id="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="item in topStories" class="swiper-slide">
          <div class="content">
            <img class="imgload" :src="attachImageUrl(item.image)">
            <span @click="showArticle(item.id)" class="text">{{item.title}}</span>
          </div>
          <div @click="showArticle(item.id)" class="mask"></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Swiper from '../../static/swiper/swiper-3.4.2.min.js';
export default {
  data: function() {
    return {
      topStories: ''
    };
  },
  created: function() {
    this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then((res) => {
      this.topStories = res.data.STORIES.top_stories;
      this.$nextTick(function() {
        this.initSwiper();
      });
    });
  },
  methods: {
    initSwiper() {
      this.mySwiper = new Swiper('.swiper-container', {
        // 滑动方向
        direction: 'horizontal',
        loop: true,
        // 自动播放时间
        autoplay: 2000,
        // 使用分页器
        pagination: '.swiper-pagination',
        // 用户操作后是否停止 autoplay ,默认为 true：停止 autoplay
        autoplayDisableOnInteraction: false
      });
    },
    startPlay() {
      this.initSwiper();
    },
    showArticle(id) {
      // 跳转到动态路由
      this.$router.push('/article/' + id);
      // 更新文章的 id
      this.$store.commit('setArticleId', id);
    },
    attachImageUrl(srcUrl) {
      if (srcUrl !== undefined) {
        // https://pic4.zhimg.com/v2-a370035be6057153f887564745a7c5df.jpg
        return 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + srcUrl.slice(0, 4) + srcUrl.slice(5);
      }
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import '../../static/swiper/swiper-3.4.2.min.css';
#swiper {
  margin-top: 50px;
  .swiper-container {
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
    .swiper-wrapper {
      .swiper-slide {
        position: relative;
        .imgload {
          position: absolute;
          width: 100%;
          top: -30%;
        }
        .text {
          position: absolute;
          bottom: 30px;
          left: 0;
          padding: 0 20px;
          font-size: 20px;
          color: #fff;
          z-index: 2;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
          z-index: 1;
        }
      }
    }
    .swiper-pagination {
      // 更改分页器圆点颜色
      .swiper-pagination-bullet {
        background: rgba(250, 250, 250, 0.4);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background: rgba(250, 250, 250, 0.9);
      }
    }
  }
}
</style>
