<template>
  <div id="main">
    <Header title="首页" />
    <div id="content">
      <div class="movie_menu">
        <div class="city_name" @click="show=true">
          <span style="font-size:15px">{{$store.state.city}}</span>
          <i class="iconfont icon-xiajiantou1"></i>
        </div>
        <div class="search_entry">
          <input type="text" style="font-size:12px;" placeholder="请输入影片/影院" @focus="toSearch" />
          <!-- <i class="iconfont icon-sousuo"></i> -->
          <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="swipe">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in images" :key="index">
              <img :src="item"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-dropdown-menu >
        <van-dropdown-item v-model="value1" :options="option1"  @change="changeVal(value1)"/>
      </van-dropdown-menu>
      <Category :typeNum="value1"/>
    </div>

    <!-- <div v-if="!visible" @click="visible = true"> -->
    <van-overlay :show="show" @click="show = false" class="overlay">
      <div class="wrapper">
        <van-area title="地区" :area-list="areaList" @confirm="selectCity" />
      </div>
    </van-overlay>
    <!-- </div> -->
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
import { areaList } from "@vant/area-data";
import Category from "@/components/Home/Category.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Category
  },
  data() {
    return {
      areaList,
      show: false,
      // city: "中原区",
      images:[
          '/images/swipe01.jpg',
          '/images/swipe02.jpg',
          '/images/swipe03.jpg',
      ],
      value1: 9,
      option1: [
        { text: "分类", value: 9 },
        { text: "动漫", value: 3 },
        { text: "言情", value: 4 },
        { text: "剧情", value: 5 },
        { text: "动作", value: 6 },
        { text: "喜剧", value: 7 },
        { text: "科幻", value: 8 }
      ]
    };
  },
  methods: {
    changeVal(value1){
      this.value1=value1
    }
    ,
    selectCity(values) {
      let content = values[2].name.length > 3 ? ".." : "";
      let cityVal = values[2].name.substr(0, 3) + content;
      this.$store.commit("changeCity", { city: cityVal });
    },
    toSearch(){
      // 跳转至搜索页
      this.$router.push('/search')
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 130px;
}
.overlay {
  z-index: 999;
}
.swipe{
    width: 100%;
    display: flex;
    justify-content: center;
}
.my-swipe{
    width:352px;
    height: 90px;
    border-radius: 6px;
    overflow: hidden;
    
}
.swipe img{
    width:352px;
    height: 90px;
}
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 42px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
.search_entry input {
  width: 245px;
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-left: 6px;
}
a-input {
  width: 240px;
}
</style>