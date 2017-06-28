<template>
  <div class="article">
    <div class="header">
      <div @click="back()" class="back">
        <i class="icon-back"></i>
      </div>
      <div class="icon-wrapper">
        <div class="icons">
          <i class="icon-share icon"></i>
          <i class="icon-star icon"></i>
          <i @click="showComment()" class="icon-comment icon">
            <span class="text">{{extraInfo.comments}}</span>
          </i>
          <i class="icon-favour icon">
            <span class="text">{{extraInfo.popularity | showFavour}}</span>
          </i>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="image-wrapper">
        <span class="title">{{article.title}}</span>
        <span class="image-source">{{article.image_source}}</span>
        <img :src="article.image" class="image">
        <div class="mask"></div>
      </div>
      <div v-html="article.body" class="article-body"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  mapGetters
} from 'vuex';
export default {
  data: function() {
    return {
      article: '',
      extraInfo: '',
      preArticleId: ''
    };
  },
  activated() {
    if (this.preArticleId !== this.articleId) {
      this.article = '';
      this.extraInfo = '';
      this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.articleId).then((res) => {
        this.article = res.data.CONTENTS;
        this.preArticleId = this.articleId;
      });
      // 获取文章的评论数和点赞数
      this.axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + this.articleId).then((res) => {
        this.extraInfo = res.data.DES;
      });
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters([
      'articleId'
    ])
  },
  filters: {
    showFavour(value) {
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'k';
      } else {
        return value;
      }
    }
  },
  methods: {
    back() {
      this.$router.push('/home');
    },
    showComment() {
      this.$router.push('/article/comment');
      this.$store.commit('setArticleId', this.articleId);
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import '../common/css/news_qa.auto.css';
.article {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  .header {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 768px;
    height: 50px;
    align-items: center;
    background: rgb(53, 157, 218);
    color: #fff;
    z-index: 5;
    .back {
      flex: 0 0 50px;
      width: 50px;
      text-align: center;
      .icon-back {
        font-size: 20px;
      }
    }
    .icon-wrapper {
      flex: 1;
      .icons {
        float: right;
        .icon {
          display: inline-block;
          width: 60px;
          font-size: 20px;
          &:first-child {
            width: 50px;
            font-size: 18px;
          }
          &.icon-star {
            width: 50px;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            padding-left: 2px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .content-wrapper {
    width: 100%;
    max-width: 768px;
    margin-top: 50px;
    .image-wrapper {
      position: relative;
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
      .title {
        position: absolute;
        bottom: 28px;
        left: 0;
        padding: 0 10px;
        font-size: 22px;
        color: #fff;
        z-index: 2;
      }
      .image-source {
        position: absolute;
        bottom: 8px;
        right: 0;
        padding: 0 10px;
        font-size: 14px;
        color: rgba(240, 240, 240, 0.9);
        z-index: 2;
      }
      .image {
        position: absolute;
        top: -30%;
        left: 0;
        width: 100%;
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
    .article-body {
      .main-wrap {
        .headline {
          height: 0;
          border: none;
        }
      }
    }
  }
}
</style>
