<template>
  <div>
    <Header title="确认订单" />
    <van-card
      :num="seatCount"
      :price="scheduleData.price.toFixed(2)"
      :desc="'开场时间:'+scheduleData.show_time"
      :title="scheduleData.name"
      :thumb="scheduleData.poster"
    />
    <div class="tips">
      <p class="title">购票须知</p>
      <ol class="intro">
        <li>请确认场次和时间无误，购买成功后将不予以退还</li>
        <li>由于设备故障等不可抗力因素，存在少量场次取消的情况，会进行退票退款</li>
        <li>由于影院系统不稳定等因素，存在出票失败的情况，会进行退款</li>
        <li>购票成功后，请在线下影院进行取票</li>
        <li>下单即代表你同意我们的用户服务协议</li>
      </ol>
    </div>
    <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit" />
    <van-action-sheet v-model="show" title="支付订单">
      <div class="totalPrice">￥{{totalPrice.toFixed(2)}}</div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell class="iconfont icon-weixinzhifu" title="微信支付" clickable @click="radio = '0'">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
          <van-cell class="iconfont icon-zhifubao" title="支付宝" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="pay-btn" @click="payOrder">付款</div>
    </van-action-sheet>
  </div>
</template>

<script>
import { updateOrder } from "@/api/index.js";
import Header from "@/components/header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      scheduleData: this.$route.params.scheduleData,
      seatInfo: this.$route.params.seatInfo,
      seatCount: this.$route.params.seatCount,
      orderSeatInfo: this.$route.params.orderSeatInfo,
      totalPrice: 0,
      show: false,
      radio: "0",
      user_id: this.$cookies.get("user_id")
    };
  },
  created() {
    this.totalPrice = this.seatCount * this.scheduleData.price;
  },
  methods: {
    onSubmit() {
      this.show = true;
    },
    async payOrder() {
      let { data: res } = await updateOrder(
        this.user_id,
        this.scheduleData,
        this.orderSeatInfo,
        this.seatInfo,
        this.seatCount,
        this.totalPrice,
        this.radio
      );
      if(res.success_code===200){
          this.$toast.success("付款成功");
          this.$router.push('/orderlist')
      }else if(res.error_code===1){
          this.$toast.fail('更新选座失败')
      }else if(res.error_code===2){
          this.$toast.fail('付款失败')
      }
    }
  }
};
</script>

<style scoped>
.van-card {
  margin-top: 40px;
  margin-bottom: 60px;
  font-size: 16px;
}
.van-card__thumb {
  width: 90px;
  height: 125px;
}
.van-card__content {
  padding: 16px 0 10px 5px;
}
.van-card__desc {
  padding-top: 8px;
  font-size: 12px;
}
.van-card__price {
  font-size: 15px;
  color: red;
}
.van-card__num {
  padding-right: 12px;
}
.tips {
  display: flex;
  flex-flow: column;
  background-color: #fff;
  padding: 14px;
}
.tips p {
  margin-bottom: 8px;
  font-size: 13px;
  color: #777;
  line-height: 17px;
  letter-spacing: 0.02rem;
  text-align: justify;
}
.tips .title {
  color: #333;
  font-size: 15px;
  font-weight: 700;
  padding-bottom: 8px;
  border-bottom: 0.02rem solid rgb(212, 212, 212);
}
ol {
  padding-left: 18px;
}
ol li {
  margin-bottom: 5px;
  line-height: 20px;
  list-style: decimal;
  font-size: 13px;
  color: #777;
}
ol li::marker {
  padding-left: 14px;
}
.totalPrice {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
}
.iconfont:before {
  font-size: 30px;
  padding-right: 8px;
  margin: 8px 0;
  color: #20db74;
}
.icon-zhifubao:before {
  color: rgba(9, 129, 241, 0.829);
}
.van-cell__title,
.van-cell__value {
  line-height: 40px;
}
.pay-btn {
  width: 280px;
  height: 35px;
  line-height: 35px;
  background-color: rgb(224, 33, 33);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  margin: 20px 47px;
}
</style>