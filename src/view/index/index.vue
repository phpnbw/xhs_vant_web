<template>
  <div id="list">
    <van-notice-bar scrollable text="小红书H5移动版" />
    <form action="/">
      <van-search
          v-model="keyInfo"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>
    <van-tabs v-model="active" sticky @click="tabChange">
      <van-tab v-for="item in tabTypeName" :title="item.name" :type="item.type" :key="item.type">
        <van-divider/>
        <Grid :dataList="dataList" @onRefresh='onRefresh' @onLoadNextPage="onLoadNextPage"></Grid>
      </van-tab>
    </van-tabs>

    <!--    <van-button type="primary" @click="btn">请求1</van-button>-->
    <!--    <van-button type="danger" @click="btnloading">请求2</van-button>-->
  </div>
</template>

<script>
import {getuserInfos, getDataLIst} from "@/request/api.js"
import {Toast} from 'vant';
// import Tab from "@/components/Tab/Tab";
// import TabBar from "@/components/TabBar/TabBar";
import Grid from "@/components/Grid/Grid";

export default {
  name: 'index',
  components: {
    Grid
  },
  data() {
    return {
      keyInfo: '',
      active: '',
      page:1,//当前页数
      tabTypeName: [
        {'name': '推荐', 'type': 'recommend_v2'},
        {'name': '旅行', 'type': 'homefeed.travel_v2'},
        {'name': '健身', 'type': 'homefeed.fitness_v2'},
        {'name': '数码', 'type': 'homefeed.digital_v2'},
        {'name': '读书', 'type': 'homefeed.books_v2'},
        {'name': '护肤', 'type': 'homefeed.skincare_v2'}
      ],
      dataList: [],
      tabName: [],
      thisTabType: 'recommend_v2', //当前选中标签
    };
  },
  created() {
    this.getDataLIst()
  },
  methods: {
    //下拉刷新
    onRefresh(data) {
      this.page=1
      this.getDataLIst(1)//1下拉刷新
      console.log('下拉刷新')
    },
    //滚动翻页
    onLoadNextPage(){
      this.page++
      this.getDataLIst(2)//2翻页
      console.log('滚动翻页')
    },
    //搜索
    onSearch(val) {
      // Toast(this.keyInfo);
      this.getDataLIst()
    },
    onCancel() {
      Toast('取消');
    },
    async getDataLIst(type = 0) {
      var that=this
      var params = {
        tabInfo: this.thisTabType,
        keyInfo: this.keyInfo,
        onRefresh:0,
        page:this.page
      }
      if(type===1){
        params.onRefresh=1
      }
      await getDataLIst(params).then((res) => {
        if(type===2){
          for (let i = 0; i < res.data.list.length; i++) {
            this.dataList.push(res.data.list[i]);
          }
        }else{
          this.dataList = res.data.list
        }
      })
    },
    tabChange(index, type) {
      this.page=1
      this.thisTabType = this.tabTypeName[index]['type'];
      this.getDataLIst()
    }
  },
};
</script>

<style scoped>
#list {
  padding-bottom: 100px;
}
</style>
