<template>
  <div class="articleList" ref="articleList">
    <div v-for="(items, index) in articleList">
      <div class="date">{{showDay(index)}}</div>
      <div v-for="item in items" class="list">
        <article @click="showArticle(item.id)" class="story">
          <span class="text">{{item.title}}</span>
          <img :src="attachImageUrl(item.images[0])" class="image">
        </article>
      </div>
    </div>
    <div v-show="loading" class="infinite-scroll">
      <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="rgb(53, 157, 218)" stroke-width="5"></circle>
      </svg>
      <span class="infinite-scroll-text">{{tips}}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data: function() {
    return {
      articleList: [],
      date: [],
      todayDate: '',
      REQUIRE: true,
      loading: false,
      tips: '努力加载中...'
    };
  },
  created() {
    // 获取今日新闻
    this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then((res) => {
      this.date.push(res.data.STORIES['date']);
      this.articleList.push(res.data.STORIES['stories']);
      this.todayDate = res.data.STORIES['date'];
    });
  },
  mounted() {
    // 添加滚动事件，检测滚动到页面底部
    window.addEventListener('scroll', this.scrollBottom);
  },
  methods: {
    scrollBottom() {
      // 滚动到页面底部时，请求前一天的文章内容
      if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        this.REQUIRE = false;
        this.loading = true;
        this.tips = '努力加载中...';
        this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + this.todayDate).then((res) => {
          this.articleList.push(res.data.STORIES['stories']);
          this.date.push(res.data.STORIES['date']);
          this.todayDate = res.data.STORIES['date'];
          // 请求的数据加载完成后，再次滚动到底部时，允许请求前一天数据
          this.$nextTick(() => {
            this.REQUIRE = true;
            this.loading = false;
          });
        }).catch(() => {
          this.tips = '连接失败，请稍后重试';
          // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
          this.REQUIRE = true;
        });
      }
    },
    showArticle(id) {
      // 跳转到动态路由
      this.$router.push('/article/' + id);
      // 更新文章的 id
      this.$store.commit('setArticleId', id);
    },
    showDay(index) {
      if (index === 0) {
        return '今日新闻';
      } else {
        return this.getToday(index);
      }
    },
    getToday(index) {
      let year = this.date[index].slice(0, 4);
      let month = this.date[index].slice(4, 6);
      let day = this.date[index].slice(6);
      let today = new Date(year + '/' + month + '/' + day);
      let week = ['日', '一', '二', '三', '四', '五', '六'];
      return month + '月' + day + '日' + ' 星期' + week[today.getDay()];
    },
    attachImageUrl(srcUrl) {
      if (srcUrl !== undefined) {
        return 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + srcUrl.slice(0, 4) + srcUrl.slice(5);
      }
    },
    addZero(value) {
      return value < 10 ? '0' + value : value;
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import '../common/css/mixin.scss';
.articleList {
  width: 100%;
  background: rgba(240, 240, 240, 0.8);
  .date {
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
    color: rgba(12, 12, 12, 0.9);
  }
  .list {
    margin: 0 10px;
    .story {
      display: flex;
      width: 100%;
      margin-bottom: 8px;
      padding: 14px 14px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 1px 1px 1px #ccc;
      .text {
        flex: 1;
        padding-right: 10px;
        font-size: 18px;
        line-height: 22px;
      }
      .image {
        flex: 0 0 auto;
        height: 75px;
      }
    }
  }
  .infinite-scroll {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    .loader-circular {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      animation: rotate 2s linear infinite;
      .loader-path {
        animation: dash 1.5s linear infinite;
      }
    }
    .infinite-scroll-text {
      margin-left: 10px;
      font-size: 16px;
    }
  }
}
</style>
