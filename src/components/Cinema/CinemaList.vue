<template>
  <div class="cinema_body">
    <ul>
      <div v-for="(item,index) in cinemaListData" :key="index">
      <router-link tag="li" :to="{name:'cinemadetail',params:{cinemaData:item}}">
        <div>
          <span>{{item.cinema_name}}</span>
          <!-- <span class="q"><span class="price">22.9</span>元起</span> -->
        </div>
        <div class="address">
          <span>{{item.specified_address}}</span>
          <span>{{item.distance}}km</span>
        </div>
        <div class="card">
          <div class="or">小吃</div>
          <div class="bl">折扣</div>
        </div>
      </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
import { getCinemaList } from "@/api/index.js";
export default {
  name: "CinemaList",
  props:['disNum'],
  data() {
    return {
      cinemaListData: [],
    };
  },
  activated() {
    this.loadCinemaList();
  },
  watch:{
    //   监听父组件传递过来的排序值，watch中不能使用箭头函数
      disNum:function(newVal,oldVal){
          this.loadCinemaList()
      }
  },
  methods: {
    async loadCinemaList() {
      let { data: res } = await getCinemaList(this.$store.state.city,this.disNum);
      console.log(res);
      if (res.success_code === 200) {
        this.cinemaListData = res.data;
      }
    }
  }
};
</script>

<style scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
  font-size: 14px;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 5px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 14px;
}
.cinema_body .address {
  font-size: 12px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 14px;
  line-height: 14px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 10px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>