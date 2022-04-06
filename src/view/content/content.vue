<template>
  <div class="content" style="margin: 2px 8px 38px 8px">
    <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div style="text-align: center; font-size: 21px;">{{ title }}</div>
    <van-divider />
    <div style="margin-left: 3px;" >
      <span ><van-image round width="0.9rem" height="0.9rem" :src="user_img"/></span>
      <span style="margin-left: 10px;">{{user_name}}</span>
      <span style="float: right;font-size: 13px;margin-top: 15px;">{{release_time}}</span>
    </div>
    <van-divider />

    <div style="margin-bottom: 200px;" class="van-hairline--surround">{{content}}</div>
  </div>
</template>

<script>
import {getContentData} from "@/request/api";

export default {
  name: "Content",
  data(){
    return{
      content:'',
      noteId:'',
      user_name:'',
      user_img:'',
      title:'',
      release_time:''
    }
  },
  created() {
    this.noteId=this.$route.params.noteId
    this.title=this.$route.params.title
    this.release_time=this.$route.params.release_time
    this.initData()
  },
  methods:{
    async initData(){
      var that=this;
      var params = {
        noteId: this.noteId
      }
      await getContentData(params).then((res) => {
        console.log(res.data)
        // this.dataList=res.data.list
        that.content=res.data.content
        that.user_name=res.data.user_name
        that.user_img=res.data.user_img
      })
    },
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
    onClickRight() {
      // Toast('按钮');
    },
  }

}
</script>

<style scoped>
  .content{
    background: #f7f8fa;
    font-size: 30px;
    text-align: left;
  }
</style>
