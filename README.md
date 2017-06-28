## 知乎日报
　　本项目主要使用 vue 的全家桶进行开发，项目中使用的 API 来自 [知乎Api](http://www.huangxizhou.com/2017/04/29/zhihu-dailyAPI/)，通过完成此项目，加深了对 vue 全家桶的学习和理解。


## 演示 
* [在线演示](https://yangrenmu.github.io/zhihuDaily/#/home)
* 移动端演示，扫描下面二维码即可。
![](http://upload-images.jianshu.io/upload_images/4928722-c4962dbb4b0a90ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 技术栈
* vue
* vuex
* vue-router
* axios
* swiper

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 项目结构
<pre>
├── src
│   ├── common  
│   │   ├── css                   // 公共的 css
│   │   └── fonts                 // 图标字体 iconfont
│   ├── components
│   │   ├── Article.vue           // 文章
│   │   ├── ArticleList.vue       // 文章列表
│   │   ├── Comment.vue           // 评论
│   │   ├── HomePage.vue          // 首页
│   │   ├── Sidebar.vue           // 侧边栏
│   │   ├── Swiper.vue            // 轮播图
│   │   └── Theme.vue             // 日报主题
│   ├── router
│   │   └── index.js              // 路由配置
│   ├── vuex
│   │   └── store.js              // 状态管理
│   ├── App.vue                   // 主组件，切换页面
│   └── main.js                   // 初始化 vue 实例并使用需要的插件
├── static                        // 静态资源，css 样式重置及 swiper 插件
├── eslintrc.js                   // 配置 eslint
├── index.html                    // 项目入口文件
└── package.json                  // 项目配置文件
</pre>

## 项目截图
![](http://upload-images.jianshu.io/upload_images/4928722-6bc82a595207e5ed.gif?imageMogr2/auto-orient/strip)
![](http://upload-images.jianshu.io/upload_images/4928722-a967b48fc2b030be.gif?imageMogr2/auto-orient/strip)
