<template>
  <div>
    <div class="city_name" @click="show=true">
          <span style="font-size:15px">{{city}}</span>
          <i class="iconfont icon-xiajiantou1"></i>
        </div>
        <van-overlay :show="show" @click="show = false" class="overlay">
        <div class="wrapper">
            <van-area title="地区" :area-list="areaList"  @confirm="getCity"/>
        </div>
    </van-overlay>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
export default {
  data() {
    return {
        areaList,
        show: false,
        city: "中原区",
    };
  },
  methods: {
      getCity(values){
          let content=values[2].name.length>3 ? '..' : '';
          this.city=values[2].name.substr(0,3)+content;
      }
  }
};
</script>

<style scoped>
.wrapper{
    padding-top: 130px;
}
.overlay{
    z-index: 999;
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
.city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
</style>