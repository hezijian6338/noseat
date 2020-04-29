# noseat
一个前端小项目，用到了vue.js、vuex、vue-router、axios的基本知识

项目的一些难点：

- 计数器需要在beforeDistory中清除，不然在页面切换回来的时候，会重新生成计时器
- 计数器可以使用keep-alive进行组件缓存

