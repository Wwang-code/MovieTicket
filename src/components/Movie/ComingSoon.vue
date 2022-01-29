<template>
  <div class="movie_body">
      <ul>
          <li v-for="(item,index) in movieList" :key="index">
              <div class="pic_show"><img :src="item.poster" alt=""></div>
              <div class="info_list">
                  <h2>{{item.name}}</h2>
                  <p>期待指数 <span class="grade">{{item.score}}</span></p>
                  <p>导演：{{item.director}}</p>
                  <p>主演：{{item.actor}}</p>
                  <p>暂未定档</p>
              </div>
              <div class="btn_mall">暂未上映</div>
          </li>
      </ul>
  </div>
</template>

<script>
import {getPMovieList} from '@/api/index.js'
export default {
    name:'ComingSoon',
    data(){
        return{
            movieList:[]
        }
    },
    created(){
        this.loadMovieList()
    },
    methods:{
        async loadMovieList(){
            // 即将上映的状态码为0，正在热映为1，已下架为2
            let {data:res}= await getPMovieList('0')
            if(res.success_code===200){
                this.movieList=res.data
            }
        }
    }
}
</script>

<style scoped>
.movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 14px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 12px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:67px; height:27px; line-height: 28px; text-align: center; background-color: #aaa; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}

</style>