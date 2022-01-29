<template>
  <div id="main">
    <Header title="个人中心" />
    <div class="header">
      <div class="left">
        <!--  <div class="avatar">
            <img :src="avatar" alt="">
        </div>-->
        <span @click="$router.push('/login')" v-if="!userInfo.user_id" class="go-login">登录/注册</span>
        <div v-else class="user-info">
          <span class="ellipsis" style="font-size: 16px;margin-bottom:5px">{{userInfo.user_name}}</span>
          <span
            class="ellipsis"
            style="font-weight:normal"
          >签名：{{userInfo.sign?userInfo.sign:'同学有点懒，还没写下签名'}}</span>
        </div>
      </div>
      <div class="right" v-if="userInfo.user_name" @click="updateUserInfo">
        <span>个人信息</span>
        <span class="icon-more"></span>
      </div>
    </div>

    <div class="content">
      <van-cell title="我的订单" is-link to="/orderlist" />
      <van-cell v-if="userInfo.user_name" title="修改个人信息" is-link to="/updateuserinfo" />
      <!-- <van-cell title="路由跳转" is-link to="index" /> -->
      <div v-if="userInfo.user_name" style="margin: 16px;margin-top:30px;display:flex;justify-content:center">
        <van-button class="loginBtn" round block type="info" @click="logout">退出登录</van-button>
      </div>
      <!-- <div class="list">
          <div class="item" @click="viewMyOrder">
            我的订单
            <span class="icon-more"></span>
          </div>
          <div class="item" @click="viewMyMovie(1)">
            想看的电影
            <span class="icon-more"></span>
          </div>
          <div class="item" @click="viewMyMovie(0)">
            看过的电影
            <span class="icon-more"></span>
          </div>
      </div>-->
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
import Login from "@/components/Personal/Login.vue";
import { getUserInfo } from "@/api/index.js";
export default {
  name: "Personal",
  components: {
    Header,
    Footer,
    Login
  },
  data() {
    return {
      userInfo: {}
    };
  },
  activated() {
    this.loadUserInfo();
  },
  methods: {
    // 获取用户信息
    async loadUserInfo() {
      if (this.$cookies.get("user_id")) {
        let { data: res } = await getUserInfo(this.$cookies.get("user_id"));
        console.log(res.data);
        if (res.success_code === 200) {
          this.userInfo = res.data;
        } else {
          this.userInfo = {};
        }
      } else {
        this.userInfo = {};
      }
    },
    logout() {
      if (this.$cookies.get("user_id")) {
        this.$cookies.remove("user_id");
        // this.$router.push("personal");
        location.reload()
        // this.$router.go(0)
      }
    },
    updateUserInfo(){
      if(this.userInfo){
        this.$router.push({name:'updateuserinfo',params:{userInfo:this.userInfo}})
      }
    }
  }
};
</script>

<style scoped>
.loginBtn{
    border: #e54847;
    background-color: #e54847;
    width: 50%;
}
.header {
  font-size: 16px;
  font-weight: bolder;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e54847;
  color: #fff;
  position: relative;
}
.header .left {
  width: 12rem;
  height: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.4rem;
}
.header .left .avatar {
  position: absolute;
  box-sizing: border-box;
  border: 0.08rem solid #f1f1f1;
  left: 0;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
}
.header .left .avatar img {
  width: 100%;
  height: 100%;
}
.header .left .go-login {
  position: absolute;
  width: 6rem;
  left: 2rem;
}
.header .left .user-info {
  width: 100%;
  position: absolute;
  left: 2rem;
  display: flex;
  flex-flow: column;
}
.header .left .user-info span:last-child {
  font-size: 0.25rem;
}
.header .right {
  display: flex;
  font-weight: lighter;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 58px;
  height: 24px;
  line-height: 24px;
  padding: 0 0.2rem;
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.2rem 0 0 0.2rem;
}
.content {
  border-top: 0.4rem solid #f1f1f1;
  font-size: 0.3125rem;
  position: fixed;
  top: 10.2rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
}
.content .list {
  background-color: #fff;
}
.content .list .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  font-size: 0.3125rem;
  border-bottom: 0.12rem solid #f1f1f1;
}
.content .list .icon-more {
  font-weight: 700;
}
</style>