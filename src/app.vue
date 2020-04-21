<!--
 * @Author: 夏夏夏
 * @Date: 2020-04-16 11:43:49
 * @LastEditors: 夏夏夏
 * @LastEditTime: 2020-04-20 09:40:53
 * @Description: file content
 -->
<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx';
import Todo from './todo/todo.vue'

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data() {
    return {
      
    }
  }
}
</script>
<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999999;
  opacity: 0.9;
  z-index: -1;
}
</style>