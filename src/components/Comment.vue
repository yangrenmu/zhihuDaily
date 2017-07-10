<template>
  <div class="comment">
    <div class="header">
      <div @click="back()" class="back">
        <i class="icon-back"></i>
      </div>
      <div class="edit">
        <span class="text">条点评</span>
        <i class="icon-edit"></i>
      </div>
    </div>
    <div class="comment-list">
      <div class="long-comment">
        <span class="text">{{longComment.length}} 条长评</span>
        <div v-show="longComment.length !== 0" v-for="item in longComment">
          <div class="comment-content">
            <div class="author">
              <div class="avatar">
                <img class="image" :src="item.avatar">
              </div>
              <span class="name">{{item.author}}</span>
              <div class="favour">
                <i class="icon-favour"></i>
                <span class="likes">{{item.likes}}</span>
              </div>
            </div>
            <div class="comment-text">
              <span class="long-text">{{item.content}}</span>
              <span class="time">{{item.time | showTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="short-comment">
        <span class="text">{{shortComment.length}} 条短评</span>
        <div v-show="shortComment.length !== 0" v-for="item in shortComment">
          <div class="comment-content">
            <div class="author">
              <div class="avatar">
                <img class="image" :src="item.avatar">
              </div>
              <span class="name">{{item.author}}</span>
              <div class="favour">
                <i class="icon-favour"></i>
                <span class="likes">{{item.likes}}</span>
              </div>
            </div>
            <div class="comment-text">
              <span class="long-text">{{item.content}}</span>
              <span class="time">{{item.time | showTime}}</span>
            </div>
          </div>
        </div>
      </div>
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
      longComment: '',
      shortComment: '',
      preArticleId: ''
    };
  },
  activated() {
    if (this.preArticleId !== this.articleId) {
      this.article = '';
      this.extraInfo = '';
    }
    this.axios.get('http://zhihuapi.herokuapp.com/api/4/story/' + this.articleId + '/long-comments').then((res) => {
      this.preArticleId = this.articleId;
      this.longComment = res.data.comments;
    });
    this.axios.get('http://zhihuapi.herokuapp.com/api/4/story/' + this.articleId + '/short-comments').then((res) => {
      this.shortComment = res.data.comments;
    });
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters([
      'articleId'
    ])
  },
  filters: {
    showTime(value) {
      function addZero(index) {
        return index < 10 ? '0' + index : index;
      }
      let time = new Date(value * 1000);
      let month = addZero(time.getMonth() + 1);
      let day = addZero(time.getDate());
      let hour = addZero(time.getHours());
      let minute = addZero(time.getMinutes());
      return month + '-' + day + ' ' + hour + ':' + minute;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" type="text/css">
.comment {
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
    .edit {
      flex: 1;
      .text {
        padding-left: 10px;
      }
      .icon-edit {
        float: right;
        width: 50px;
        text-align: center;
      }
    }
  }
  .comment-list {
    margin-top: 50px;
    .text {
      display: inline-block;
      width: 100%;
      height: 40px;
      padding: 0 15px;
      line-height: 40px;
      font-size: 14px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
    .comment-content {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      .author {
        display: flex;
        height: 50px;
        align-items: center;
        .avatar {
          flex: 0 0 30px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          .image {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          flex: 1;
          padding-left: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        .favour {
          font-size: 10px;
          color: rgb(190, 190, 190);
        }
      }
      .comment-text {
        padding: 0 4px 0 40px;
        .long-text {
          text-align: justify;
          font-size: 16px;
          line-height: 20px;
        }
        .time {
          display: block;
          margin: 20px 0;
          font-size: 12px;
          color: rgb(190, 190, 190);
        }
      }
    }
  }
}
</style>
