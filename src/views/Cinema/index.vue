<template>
  <div id="main">
    <Header title="影院" />
    <div id="content">
      <!-- <div class="city_switch">
        全城
        <i class="iconfont icon-xiajiantou"></i>
      </div>-->
      <van-dropdown-menu >
        <van-dropdown-item v-model="value1" :options="option1"  @change="changeVal(value1)"/>
      </van-dropdown-menu>
      <CinemaList :disNum="value1" />
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
        { text: "排序", value: 0 },
        { text: "距离较近", value: 1 },
        { text: "距离较远", value: 2 }
      ]
    };
  },
  created() {
    console.log(this.value1);
  },
  methods: {
    changeVal(value1) {
      this.value1 = value1;
      console.log(this.value1);
    }
  }
};
</script>

<style>
</style>