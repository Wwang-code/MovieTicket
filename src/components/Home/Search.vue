<template>
  <div>
    <Header title="搜索" />
    <van-search v-model.trim="searchVal" show-action placeholder="请输入搜索关键词" @cancel="goback" />
    <div class="movie_body">
      <ul>
        <li v-for="(item,index) in searchList" :key="index">
          <div class="pic_show">
            <img :src="item.poster" alt />
          </div>
          <div class="info_list">
            <h2>{{item.name}}</h2>
            <p>
              期待指数
              <span class="grade">{{item.score}}</span>
            </p>
            <p>导演：{{item.director}}</p>
            <p>主演：{{item.actor}}</p>
            <p>{{item.intro}}</p>
          </div>
          <div class="btn_mall" v-if="item.playing==1">购票</div>
          <div class="btn_no" v-else>暂未上映</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { matchMovieByName } from "@/api/index.js";
import Header from "@/components/header.vue";
export default {
  name: "Search",
  components: {
    Header
  },
  data() {
    return {
      searchVal: "",
      searchList: []
    };
  },
  activated() {},
  watch: {
    searchVal: function(newVal, oldVal) {
      clearTimeout(this.timer);
      if (newVal) {
        this.timer = setTimeout(async () => {
          let { data: res } = await matchMovieByName(newVal);
          if (res.success_code === 200) {
            this.searchList = res.data;
            console.log(this.searchList);
          }
        }, 500);
      }
    }
  },
  methods: {
    goback() {
      this.searchList = [];
      this.$router.go(-1);
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
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
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
  font-size: 14px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 12px;
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
.movie_body .btn_no {
  width: 67px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #aaa;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>