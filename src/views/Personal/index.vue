<template>
  <div id="main">
      <Header title="个人中心"/>
      <div>
          <Login/>
      </div>
      <Footer/>
  </div>
</template>

<script>
import Header from '../../components/header'
import Footer from '../../components/footer'
import Login from '@/components/Personal/Login.vue'
export default {
    name:'Personal',
    components:{
        Header,
        Footer,
        Login
    }
}
</script>

<style>

</style>