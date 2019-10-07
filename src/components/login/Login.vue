<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="right" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名：">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" @click.prevent="handleLogin()" type="primary">登录</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 使用es7的async,awite,使代码看起来像同步
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      // 结构赋值
      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        console.log(data)
        localStorage.setItem('token', data.token)
        this.$router.push('/')
        console.log(this.$message)
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
  .login-wrap{
    height:100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form{
    width:400px;
    background: #fff;
    padding:0 20px 20px;
    border-radius:5px;
  }
  .login-btn{
    width:100%;
  }
</style>
