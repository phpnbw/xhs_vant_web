<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<!--      <p>刷新次数: {{ count }}</p>-->
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad" :immediate-check="false">
        <van-grid :gutter="10" :column-num="2" :center="false" clickable>

          <van-grid-item v-for="item in dataList" class="shadow" :key="item.note_id">
            <van-image :src="item.cover_img" @click="goUrl(item.note_id,item.title,item.release_time)" />
            <span class="title"> {{ item.title }}</span>
            <van-divider />

            <div style="position: absolute;bottom: 3px; width: 83%" >
              <span style="float:left"><van-image round width="0.6rem" height="0.6rem" :src="item.user_img"/></span>
              <span style="float: left;margin-top: 5px;margin-left: 5px;">{{item.user_name}} </span>
              <span @click="getComment(item.note_id)" style="float: right"><van-icon  size="20px" name="chat-o" :badge="item.comments_num?item.comments_num:''" /></span>
            </div>
          </van-grid-item>

        </van-grid>
      </van-list>
    </van-pull-refresh>

    <van-popup v-model="showPopup" round closeable close-icon="close" position="bottom" :style="{ height: '75%' }" @close="closePopup">
      <van-list v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="listOnload" :immediate-check="false">
        <van-divider />
        <van-cell v-for="item in commentData" :key="item.comment_id">
          <van-row gutter="20" >
            <van-col span="3"><span style="float:left"><van-image round width="1rem" height="1rem" :src="item.user_img"/></span></van-col>
            <van-col span="21">
              <van-row type="flex" justify="end">
                <van-col span="19">
                  <van-row>{{item.user_name}}</van-row>
                  <van-row>{{item.time}}</van-row>
                </van-col>
                <van-col span="5"><van-icon name="good-job-o" size="0.3rem" />{{item.likes}}</van-col>
              </van-row>
              <van-row style="margin-top: 7px;">
                <div class="commentInfo">{{item.content}}</div>
              </van-row>
            </van-col>
          </van-row>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
        </van-cell>
      </van-list>
    </van-popup>

  </div>
</template>

<script>
import {Toast} from "vant";
import {getCommentData} from "@/request/api.js"
export default {
  props: ['dataList'],
  name: "Grid",
  data(){
    return {
      listLoading:false,
      listFinished:true,
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      showPopup:false,
      commentData:[]
    }
  },
  methods: {
    goUrl(noteId,title,release_time){
      this.$router.push({
        name: 'Content',
        params: {
          noteId: noteId,
          title:title,
          release_time:release_time,
        }
      })
    },
    //底部加载翻页
    onLoad(){
      this.$emit('onLoadNextPage', 'nextPage')
      setTimeout(()=>{
        this.loading=false
      },3000)
      // this.loading=false
      if(this.dataList.length<10){
        this.finished=true
      }
    },
    listOnload(){
      console.log('评论加载')
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
        this.$emit('onRefresh', 'onRefresh')
      }, 300);
    },
    //获取评论
    async getComment(note_id) {
      var that=this
      var params = {
        noteId: note_id
      }
      await getCommentData(params).then((res) => {
        // console.log(res.data)
        that.commentData=res.data
        console.log(that.commentData)
        that.showPopup=true;
      })
    },
    closePopup(){
      this.commentData=[];
    },
    loadClose(){
      this.loading=true
    },
  },
}
</script>

<style scoped>
span {
  font-size: 24px;
}
.title{
  margin-top: 30px;
}

.shadow{
  -webkit-box-shadow: #b3b3b3  0px 0px 5px;
  -moz-box-shadow: #b3b3b3  0px 0px 5px;
  box-shadow: #b3b3b3  0px 0px 5px;
  background: #e5e6df;
}
.commentInfo{
  font-size: 30px;
}
</style>
