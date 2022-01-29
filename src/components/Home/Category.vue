<template>
  <div class="movie_body">
    <ul>
      <div v-for="(item,index) in movieList" :key="index">
        <router-link tag="li" :to="{name:'moviedetail',params:{movieData:item}}">
        <div class="pic_show">
          <img :src="item.poster" alt />
        </div>
        <div class="info_list">
          <h2>{{item.name}}</h2>
          <p>
            评分
            <span class="grade">{{item.score}}</span>
          </p>
          <p>导演：{{item.director}}</p>
          <p>主演：{{item.actor}}</p>
          <p>{{item.intro}}</p>
        </div>
        <div class="btn_mall" v-if="item.playing==1">购票</div>
        <div class="btn_no" v-else>暂未上映</div>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
import { getPMovieList } from "@/api/index.js";
export default {
  name: "ComingSoon",
  props: ["typeNum"],
  data() {
    return {
      movieList: []
    };
  },
  watch: {
    typeNum: function(newVal, oldVal) {
      this.loadMovieList();
    }
  },
  created() {
    this.loadMovieList();
  },
  methods: {
    async loadMovieList() {
      let { data: res } = await getPMovieList(this.typeNum);
      if (res.success_code === 200) {
        this.movieList = res.data;
      }
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