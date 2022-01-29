<template>
  <div>
    <Header />

    <div class="login_body">
      <van-form>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button class="loginBtn" round block type="info" @click="login">提交</van-button>
        </div>
      </van-form>
      <div class="login_link">
        <span @click="$router.push('/register')">立即注册</span>
        <span href="#">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { login } from "@/api/index.js";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      if (this.username && this.password) {
        let { data } = await login(this.username, this.password);
        if (data.success_code === 200) {
          this.$toast.success("登录成功");
          this.$router.push("personal");
        } else if (data.error_code === 3) {
          this.$toast.fail("用户不存在");
        } else if (data.error_code === 2) {
          this.$toast.fail("密码错误");
        }
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