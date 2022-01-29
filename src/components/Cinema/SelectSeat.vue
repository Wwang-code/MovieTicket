<template>
  <div>
    <Header title="选座" />
    <div id="select-seat">
      <!-- <div class="top">
      <span class="icon-back" @click="$router.go(-1)"></span>
      <span class="name ellipsis">{{cinemaInfo.cinema_name}}</span>
      </div>-->
      <div class="movie-info">
        <div class="name">{{scheduleData.name}}</div>
        <div class="intro">
          <span class="date">{{scheduleData.public_date}}</span>
          <span class="time">{{scheduleData.show_time}}</span>
          <span class="language">{{scheduleData.language}}</span>
        </div>
      </div>
      <div class="seat-block">
        <div class="screen">{{scheduleData.hall_name}}银幕</div>
        <div class="center">银幕中央</div>
        <div class="screen-line"></div>
        <div class="row-container">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <div class="seat-container">
          <!-- v-if="hackReset" -->
          <div class="row" v-for="(itemI,indexI) in seatIJ" :key="indexI">
            <span
              class="seat"
              v-for="(itemJ,indexJ) in itemI"
              :key="indexJ"
              :class="{'iconfont icon-zuowei nosel':itemJ===1,'iconfont icon-zuowei':itemJ===0,'iconfont icon-zuowei sel':itemJ===2}"
              @click.prevent="handleSelectSeat(indexI,indexJ)"
            ></span>
          </div>
        </div>
        <div class="seat-example">
          <div class="example empty-example">
            <span class="iconfont icon-zuowei"></span>可选
          </div>
          <div class="example sold-example">
            <span class="iconfont icon-zuowei nosel"></span>不可选
          </div>
          <div class="example selected-example">
            <span class="iconfont icon-zuowei sel"></span>已选
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title" v-if="showSeat">已选座位</div>
        <div class="selected-seat" v-if="showSeat">
          <div class="seat-item" v-for="(item,index) in selectSeat" :key="index">
            <div class="left">
              <span class="seat">{{parseInt(item/10)}}排{{item%10}}座</span>
              <span class="price">{{(scheduleData.price).toFixed(2)}}元</span>
            </div>
            <!-- <span class="right icon-close" @click="cancelSelectedSeat(item[0],item[1])"></span> -->
          </div>
        </div>
        <span class="btn" v-if="!showSeat">请先选座</span>
        <span class="btn active" v-else @click="ensureSeatBtn">确认选座</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
export default {
  name: "selectSeat",
  components: {
    Header
  },
  data() {
    return {
      // 0:可选，1:不可选，2:已选
      seatIJ: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      scheduleData: this.$route.params.scheduleData,
      seatInfo: "", //别人选的座位
      showSeat: false,
      seatCount: 0, //选择的座位的个数
      selectSeat: [] // 选择的座位
    };
  },
  created() {
    this.loadInfo();
  },
  //   路由导航守卫，如果没有登录则会跳到登录页面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$cookies.get("user_id")) {
        next("/login");
      }
    });
  },
  methods: {
    loadInfo() {
      this.seatInfo = this.scheduleData.seat_info;
      if (this.seatInfo) {
        this.seatInfo = JSON.parse(this.seatInfo);
        this.seatInfo.forEach(val => {
          if (val % 10 !== 0) {
            //取余，获得座位号，先判断末尾是不是0，是0就是该排最后一个
            // 25就是2排5号
            this.seatIJ[parseInt(val / 10) - 1][(val % 10) - 1] = 1;
          } else {
            this.seatIJ[parseInt(val / 10) - 1][9] = 1;
          }
        });
      }
    },
    handleSelectSeat(indexI, indexJ) {
      if (this.seatCount === 4 && this.seatIJ[indexI][indexJ] === 0) {
        this.$toast.fail("一次最多选择4个座位哦！");
      } else {
        if (this.seatIJ[indexI][indexJ] === 0) {
          // 将座位状态改为绿色
          this.seatIJ[indexI][indexJ] = 2;
          this.selectSeat.push(
            Number((indexI + 1).toString() + (indexJ + 1).toString())
          );
          this.seatCount += 1;
          console.log(this.seatCount, this.selectSeat);
          // 打开“请先选座”按钮
          if (!this.showSeat) {
            this.showSeat = true;
          }
        } else if (this.seatIJ[indexI][indexJ] === 2) {
          //已选择的情况
          // 已选择状态下点击座位，会将状态变回可选状态
          this.seatIJ[indexI][indexJ] = 0;
          this.seatCount -= 1;
          let currentIndex; //当前取消的座位在selectedSeat中的索引
          this.selectSeat.forEach((item, index) => {
            if (
              parseInt(item / 10) - 1 == indexI &&
              parseInt(item % 10) - 1 == indexJ
            ) {
              currentIndex = index;
            }
          });
          this.selectSeat.splice(currentIndex, 1);
          //   console.log(this.seatCount, this.selectSeat);
          if (this.seatCount === 0) {
            this.showSeat = false;
          }
        }
      }
    },
    ensureSeatBtn() {
      this.seatInfo = this.seatInfo.concat(this.selectSeat);
      this.$router.push({
        name: "submitorder",
        params: {
          scheduleData: this.scheduleData,
          orderSeatInfo: this.selectSeat,
          seatInfo: this.seatInfo,
          seatCount: this.seatCount
        }
      });
    }
  }
};
</script>

<style scoped>
#select-seat {
  flex: 1;
  overflow: auto;
  font-size: 17px;
  color: #000;
  margin-top: 30px;
}

#select-seat .movie-info {
  position: absolute;
  top: 50px;
  height: 50px;
  display: flex;
  flex-flow: column;
  padding: 10px;
  z-index: 999;
}
#select-seat .movie-info .name {
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
}
#select-seat .movie-info .intro {
  font-size: 12px;
  margin-bottom: 7px;
  color: #888;
}
#select-seat .movie-info .intro span {
  margin-right: 0.12rem;
}
#select-seat .seat-block {
  width: 100%;
  background: #f1f1f1;
  position: absolute;
  left: 0;
  top: 115px;
  bottom: 0;
}
#select-seat .seat-block .screen {
  width: 150px;
  margin: 0 auto;
  text-align: center;
  background: #dcdcdc;
  font-size: 12px;
  padding: 3px 0;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: relative;
  left: 0.28rem;
}
#select-seat .seat-block .center {
  font-size: 8px;
  width: 100px;
  position: absolute;
  text-align: center;
  padding: 0.08rem 0.1rem;
  top: 57px;
  left: 39%;
  margin-left: -0.3125rem;
  letter-spacing: 0.02rem;
  background-color: #fff;
  color: #888;
  border-radius: 0.12rem;
}
#select-seat .seat-block .screen-line {
  width: 0;
  height: 180px;
  border: 0.02rem dashed #dcdcdc;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: 0.28rem;
}
#select-seat .seat-block .row-container {
  position: absolute;
  top: 85px;
  left: 12px;
  width: 15px;
  height: 180px;
  padding: 10px 0;
  background-color: rgba(211, 211, 211, 0.8);
  display: flex;
  flex-flow: column;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  font-size: 10px;
}
.row-container span {
  padding: 8px;
}
#select-seat .seat-block .seat-container {
  padding: 45px 0;
  position: absolute;
  top: 50px;
  left: 49px;
}
#select-seat .seat-block .seat-container .row {
  margin-bottom: 9px;
}
#select-seat .seat-block .seat-container .row .seat {
  font-size: 20px;
  margin-left: 8px;
  color: rgb(184, 182, 182);
}
#select-seat .seat-block .seat-example {
  position: absolute;
  top: 30px;
  width: 80%;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#select-seat .seat-block .seat-example .example {
  font-size: 0.25rem;
  color: #888;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#select-seat .seat-block .seat-example .example .iconfont {
  font-size: 0.3rem;
  margin-right: 3px;
}
#select-seat .bottom {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 999;
  display: flex;
  flex-flow: column;
  padding: 30px;
  padding: 20px;
  box-sizing: border-box;
}
#select-seat .bottom .title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 28px;
}
#select-seat .bottom .btn {
  height: 35px;
  line-height: 35px;
  background-color: #f7dbb3;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
}
#select-seat .bottom .btn.active {
  background-color: #fe9900;
}
#select-seat .bottom .selected-seat {
  height: 55px;
  display: flex;
}
#select-seat .bottom .selected-seat .seat-item {
  width: 25%;
  height: 0.8rem;
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  border: 0.02rem solid #f1f1f1;
  margin-right: 0.25rem;
}
#select-seat .bottom .selected-seat .seat-item:last-child {
  margin-right: 0;
}
#select-seat .bottom .selected-seat .seat-item .left {
  display: flex;
  flex-flow: column;
  font-size: 0.25rem;
}
#select-seat .bottom .selected-seat .seat-item .left .seat {
  font-size: 0.28rem;
  color: #666;
  margin-bottom: 0.12rem;
}
#select-seat .bottom .selected-seat .seat-item .left .price {
  color: #dd2727;
  font-size: 0.24rem;
}
#select-seat .bottom .selected-seat .seat-item .right {
  font-size: 0.25rem;
}
.iconfont.icon-zuowei.nosel::before {
  color: red;
}
.iconfont.icon-zuowei.sel::before {
  color: rgb(27, 216, 36);
}
</style>