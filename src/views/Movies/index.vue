<template>
  <div id="main">
    <Header title="电影" />
    <div id="content" v-if="visible">
      <div class="movie_menu">
        <!-- <router-link to="/movies/city"> -->
        <div class="city_name" @click="showCity">
          <span style="font-size:15px">郑州</span>
          <i class="iconfont icon-xiajiantou1"></i>
        </div>
        <!-- </router-link> -->
        <div class="hot_swtich">
          <div class="hot_item">
            <router-link tag="div" to="/movies/playing">正在热映</router-link>
          </div>
          <div class="hot_item">
            <router-link tag="div" to="/movies/comingsoon">即将上映</router-link>
          </div>
        </div>
        <!-- <div class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </div>-->
      </div>
      <keep-alive>
        <router-view name="movieView" />
      </keep-alive>
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
  name: "Movies",
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
  flex: 1;
}
.movie_menu .hot_item {
  flex: 1;
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item .router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>