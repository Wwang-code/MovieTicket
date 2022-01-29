<template>
  <div>
    <Header title="电影详情" />
    <div class="movie_body">
      <ul>
        <li>
          <div class="pic_show">
            <img :src="movieData.poster" alt />
          </div>
          <div class="info_list">
            <h2>{{movieData.name}}</h2>
            <p>
              评分
              <span class="grade">{{movieData.score}}</span>
            </p>
            <p>导演：{{movieData.director}}</p>
            <p>主演：{{movieData.actor}}</p>
            <p>类型：{{movieData.type}}</p>
            <p>{{movieData.public_date}}上映 / {{movieData.movie_long}} / {{movieData.language}}</p>
          </div>
        </li>
        <div class="rates">
          <van-rate
            v-model="movieData.score"
            color="#ffd21e"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          <!-- <van-goods-action-button
          class="score-btn"
          type="danger"
          text="提交评分"
          @click="onClickButton"
        /> -->
        </div>
        <div class="intro">简介：{{movieData.intro}}</div>
      </ul>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button
          v-if="movieData.playing==1"
          type="danger"
          text="立即购买"
          @click="onClickButton"
        />
        <van-goods-action-button v-else color="#be99ff" type="warning" text="敬请期待..." />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
export default {
  name: "MovieDetail",
  components: {
    Header
  },
  data() {
    return {
      movieData: {},
    };
  },
  activated() {
    this.movieData = this.$route.params.movieData;
  },
  methods: {
    onClickButton() {
      this.$router.push("/cinema");
    }
  }
};
</script>

<style scoped>
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
.movie_body .pic_show {
  width: 100px;
  height: 130px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 16px;
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
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.rates {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 75px;
  position: relative;
}
.van-rate{
  width: 120px;
}
.score-btn{
  position: absolute;
  top: 25px;
  margin-left: 20px;
  width: 62px;
  height: 22px;
  line-height: 100px;
  font-size: 5px;
}
</style>