<template>
  <div>
    <Header title="修改个人信息" />

    <div class="login_body">
      <van-form>
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="userInfo.user_name"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-field v-model="userInfo.sign" name="签名" label="签名" placeholder="请输入个性签名" />
        <div style="margin: 16px;">
          <van-button class="loginBtn" round block type="info" @click="updateUInfo">提交修改</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { updateUInfo } from "@/api/index.js";
export default {
  name: "UpdateUserInfo",
  components: {
    Header
  },
  data() {
    return {
      userInfo: this.$route.params.userInfo
    };
  },
  methods: {
    async regist() {
      console.log(this.username);
      if (this.username && this.password && this.phone) {
        let { data } = await register(
          this.username,
          this.password,
          this.phone,
          this.sign
        );
        console.log(data);
        if (data.success_code === 200) {
          this.$toast.success("注册成功");
          this.$router.push("login");
        } else if (data.error_code === 1) {
          this.$toast.fail("用户已存在！");
        } else if (data.error_code === 2) {
          this.$toast.fail("该手机号已被注册");
        }
      }
    },
    async updateUInfo() {
      let userId = this.$cookies.get("user_id");
       console.log(this.userInfo);
      let { data: res } = await updateUInfo(
        userId,
        this.userInfo.phone,
        this.userInfo.user_name,
        this.userInfo.password,
        this.userInfo.sign
      );
      if(res.success_code===200){
          this.$toast.success('修改成功')
          this.$router.push('/personal')
      }else{
          this.$toast.fail('修改失败')
      }
    }
  }
};
</script>

<style scoped>
.login_body {
  width: 100%;
  margin-top: 20px;
}
.loginBtn {
  border: #e54847;
  background-color: #e54847;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link span {
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>