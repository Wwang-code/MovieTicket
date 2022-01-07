<template>
  <div class="login_body">
    <van-form @submit="onSubmit">
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
        <van-button class="loginBtn" round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <div class="login_link">
        <a href="#">立即注册</a>
        <a href="#">忘记密码</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
      return {
          username:'',
          password:''
      }
  }
};
</script>

<style scoped>
.login_body {
  width: 100%;
  margin-top: 20px;
}
.loginBtn{
    border: #e54847;
    background-color: #e54847;
}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}


</style>