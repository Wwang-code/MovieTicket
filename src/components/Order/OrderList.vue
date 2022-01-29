<template>
  <div>
    <Header title="我的订单" />
    <div class="cinema_body">
      <ul>
        <div v-for="(item,index) in orderListData" :key="index">
            <p>订单编号：201801014509wqq{{item.order_id}}</p>
          <van-card
            :num="item.ticket_num"
            :price="item.ticket_total_price.toFixed(2)"
            :desc="item.cinema_name+'( '+mySeat(item)+')'"
            :title="item.name"
            :thumb="item.poster"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { getOrderList } from "@/api/index.js";
export default {
  name: "OrderList",
  components: {
    Header
  },
  data() {
    return {
      orderListData: []
    };
  },
  activated() {
    this.loadOrderList();
  },
  computed: {
    mySeat() {
        // computed计算属性传参，需要使用闭包形式
      return function(item) {
        let str = "";
        if (item.order_seat_info != null) {
          let orderSeatInfo = JSON.parse(item.order_seat_info);
          orderSeatInfo.forEach(val => {
            str += parseInt(val / 10) + "排" + (val % 10) + "座" + " ";
          });
          return str;
        }
      };
    }
  },
  methods: {
    async loadOrderList() {
      let { data: res } = await getOrderList(this.$cookies.get("user_id"));
      console.log(res);
      if (res.success_code === 200) {
        this.orderListData = res.data;
      }else{
          this.$toast.fail('获取订单失败')
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
p{
    font-size: 12px;
    color: rgb(107, 107, 107);
    padding-left: 8px;
}
.van-card{
    font-size: 13px;
    height: 125px;
    padding: 5px 5px;
    border-bottom: 1px solid #ddd;
}
.van-card__thumb {
  width: 72px;
  height: 100px;
}
.van-card__title{
    margin-top: 5px;
    font-weight: 600;
}
.van-card__desc{
    font-size: 12px;
}
.van-card__num{
    float:left
}
.van-card__price{
    float:right;
    color: red;
}
.cinema_body ul {
  padding: 18px;
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