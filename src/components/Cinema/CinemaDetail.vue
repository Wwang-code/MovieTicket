<template>
  <div>
    <Header title="影院详情" />
    <div class="cinema_body">
      <ul>
        <li>
          <div>
            <span>{{cinemaData.cinema_name}}</span>
            <!-- <span class="q"><span class="price">22.9</span>元起</span> -->
          </div>
          <div class="address">
            <span>{{cinemaData.specified_address}}</span>
            <span>{{cinemaData.distance}}km</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 电影 -->
    <div class="movie-swipe">
      <van-swipe :width="100" class="swipe" @change="changePoster">
        <van-swipe-item v-for="(item,index) in hasMovieInfo" :key="index">
          <img :src="item.poster" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="current">
      <h2 v-if="!show">{{hasMovieInfo[0].name}}</h2>
      <h2 v-else>{{currentMovieSchedule[0].name}}</h2>
    </div>
    <!-- 排片情况-->
    <div class="movie_body">
      <ul v-if="!show">
        <div v-for="(item,index) in firstInfo" :key="index">
          <!-- <li> -->
          <!-- <router-link
            tag="li"
            :to="goToNext==true ? {name:'selectseat',params:{scheduleData:item}}:{path:'/login'}"
          >-->
          <router-link tag="li" :to="{name:'selectseat',params:{scheduleData:item}}">
            <div class="info_list">
              <h2>{{item.show_time}}</h2>
              <div class="price">￥{{item.price}}</div>
              <p>{{item.hall_name}}</p>
            </div>
            <!-- <div class="btn_mall">购票</div> -->
          </router-link>
          <!-- </li> -->
        </div>
      </ul>
      <ul v-else>
        <div v-for="(item,index) in currentMovieSchedule" :key="index">
          <!-- <li> -->
          <!-- <router-link
            tag="li"
            :to="goToNext==true ? {name:'selectseat',params:{scheduleData:item}}:{path:'/login'}"
          >-->
          <router-link tag="li" :to="{name:'selectseat',params:{scheduleData:item}}">
            <div class="info_list">
              <h2>{{item.show_time}}</h2>
              <div class="price">￥{{item.price}}</div>
              <p>{{item.hall_name}}</p>
            </div>
            <!-- <div class="btn_mall">购票</div> -->
          </router-link>
          <!-- </li> -->
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { getSchedule } from "@/api/index.js";
export default {
  name: "CinemaDetail",
  components: {
    Header
  },
  data() {
    return {
      cinemaData: this.$route.params.cinemaData,
      scheduleInfo: [],
      hasMovieInfo: [], // 去重后的电影信息
      movieScheduleInfo: [],
      currentMovieSchedule: [], //当前电影的排片情况
      firstInfo: [], //刚进入页面时第一个电影的排片
      show: false,
      goToNext: true
    };
  },
  created() {
    this.loadSchedule();
  },
  methods: {
    async loadSchedule() {
      this.hasMovieInfo = [];
      let { data: res } = await getSchedule(this.cinemaData.cinema_id);
      if (res.success_code === 200) {
        this.scheduleInfo = res.data.scheduleInfo;
        this.hasMovieInfo = res.data.hasMovieInfo;
        // console.log(this.hasMovieInfo);
        let movieScheduleItem = {};
        // 将电影信息列表和排片信息列表进行合并
        this.hasMovieInfo.forEach(movieItem => {
          //6 4 18 10 38
          this.scheduleInfo.forEach(scheItem => {
            // 10 10
            // 通过电影id进行匹配
            if (movieItem.movie_id === scheItem.movie_id) {
              movieScheduleItem = Object.assign(scheItem, movieItem);
              //   console.log(movieScheduleItem);
              Array.from(this.movieScheduleInfo.push(movieScheduleItem));
            }
          });
        });
        // 刚进入页面时获取第一个影片的排片信息
        if (this.show === false) {
          this.movieScheduleInfo.forEach(item => {
            if (item.movie_id === this.hasMovieInfo[0].movie_id) {
              this.firstInfo.push(item);
            }
          });
        }
        // 如果没有登录，则会跳转到登录界面
        // 使用路由导航守卫实现此功能
        /* if (this.$cookies.get("user_id") == null) {
          this.goToNext = false;
        } */
        // console.log(this.firstInfo);
      } else if (res.error_code === 1) {
        this.$toast.fail("获取排片信息失败");
      } else if (res.error_code === 2) {
        this.$toast.fail("该影院暂时无排片");
      }
    },
    // 图片切换时触发
    changePoster(index) {
      this.currentMovieSchedule = [];
      if (this.hasMovieInfo[index]) {
        // 此时选中的电影id
        let currentMovieId = this.hasMovieInfo[index].movie_id;
        // console.log(this.movieScheduleInfo);
        this.movieScheduleInfo.forEach((item, index) => {
          if (item.movie_id === currentMovieId) {
            // 当前电影id所对应的所有排片情况
            // 电影信息相同，排片信息不同
            this.currentMovieSchedule.push(item);
          }
        });
      }
      this.show = true;
      //   console.log(this.currentMovieSchedule);
    }
  }
};
</script>

<style scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
  font-size: 17px;
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
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.movie-swipe {
  width: 100%;
  height: 170px;
  background-color: #40454d;
}
.swipe {
  width: 100%;
  height: 100%;
}
.swipe img {
  width: 90px;
  height: 130px;
  margin: 20px;
  margin-left: 142px;
  border-radius: 8px;
  overflow: hidden;
}
.current {
  width: 100%;
  height: 30px;
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #e6e6e6;
}
.current h2 {
  font-size: 16px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body .intro {
  margin-top: 20px;
  padding: 8px;
  /* line-height: 100%; */
  color: #555;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 6px;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 18px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.price {
  position: absolute;
  right: 60px;
  top: 10px;
  line-height: 28px;
  text-align: center;
  color: red;
  border-radius: 4px;
  font-size: 18px;
}
</style>