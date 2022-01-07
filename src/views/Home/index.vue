<template>
  <div id="main">
    <Header title="首页" />
    <div id="content" v-if="visible">
      <div class="movie_menu">
        <div class="city_name" @click="showCity">
          <span style="font-size:15px">郑州</span>
          <i class="iconfont icon-xiajiantou1"></i>
        </div>
        <div class="search_entry">
          <input type="text" v-model="value" style="font-size:12px;" placeholder="请输入影片/影院" />
          <!-- <i class="iconfont icon-sousuo"></i> -->
          <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
        </div>
      </div>
    </div>
    <div v-if="!visible" @click="visible = true">
      <City />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
import City from "@/components/Home/City.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    City
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    showCity() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
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
  width: 260px;
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-left: 6px;
}
a-input {
  width: 240px;
}
</style>