<template>
  <div id="main">
    <Header title="影院" />
    <div id="content">
      <!-- <div class="city_switch">
        全城
        <i class="iconfont icon-xiajiantou"></i>
      </div> -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <CinemaList />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
import CinemaList from "@/components/Cinema/CinemaList.vue";
export default {
  name: "Cinema",
  components: {
    Header,
    Footer,
    CinemaList
  },
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全城", value: 0 },
        { text: "金水区", value: 1 },
        { text: "郑东新区", value: 2 },
        { text: "中原区", value: 2 }
      ]
    };
  }
};
</script>

<style>
</style>