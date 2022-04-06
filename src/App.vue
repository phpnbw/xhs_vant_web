<template>

  <div id="app">
<!--    <div><img src="./assets/logo.png"></div>-->
<!--    <router-link to="/comment">显示第一个页面</router-link>-->
<!--    <router-link to="/two">显示第二个页面</router-link>-->

    <router-view></router-view>
<!--    <router-link to="/TabBar"></router-link>-->
    <TabBar></TabBar>
  </div>

</template>

<script>
import TabBar from "@/components/TabBar/TabBar";
export default {
  name: 'App',
  components: {
    TabBar
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title{
  font-size: 30px;
  font-weight: bold;
  text-align:center;
}

.content{
  font-size: 24px;
  line-height: 2;
}
span{
  font-size: 30px;
}

</style>
