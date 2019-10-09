<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img src="@/assets/image/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class= "middle">
                        <h3>后台管理系统</h3>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="loginout">
                        <a href="#" @click.prevent="handleLoginout()">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu unique-opened router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="users">
                            <i class="el-icon-success"></i>
                            <span>用户列表</span>
                        </el-menu-item>

                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-success"></i>
                            <span>角色列表</span>
                        </el-menu-item>
                        <el-menu-item index="right">
                            <i class="el-icon-success"></i>
                            <span>权限列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-success"></i>
                            <span>商品列表</span>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <i class="el-icon-success"></i>
                            <span>分类参数</span>
                        </el-menu-item>
                         <el-menu-item index="1-3">
                            <i class="el-icon-success"></i>
                            <span>商品分类</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-success"></i>
                            <span>订单列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-success"></i>
                            <span>数据1</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
      handleLoginout() {
          localStorage.clear()
          this.$message.success('退出成功')
          this.$router.push('/login')
      }
  },
  beforeCreate () {
      // 判断 是否有token。如果没有直接返回登录页。
      // token是防止通过粘贴地址来进行访问此页。因为有可能没有登陆。
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
    .container{
        height:100%;
    }
    .header{
        background:#b3c0d1;

        height:60px;
    }
    .aside{
        background:#d3dcd6;
    }
    .main{
        background: #e9eef3;
    }
    .middle{
        text-align: center;

        line-height: 60px;
    }
    .middle>h3{
        margin:0;
        padding:0;
        color:rgb(70, 68, 68);
    }
    .loginout{
        line-height: 60px;
    }
    .loginout>a{
        text-decoration: none;
        color:#e43936;
    }
</style>
