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
                    <el-submenu :index="item1.order" v-for='(item1,index) in menu' :key='index'>
                        <!--一级菜单 -->
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <!-- 二级菜单-->
                        <!--item2.path是路由标识，和index.js里的配置一致。-->
                        <el-menu-item :index="item2.path" v-for='(item2,index) in item1.children' :key='index'>
                            <i class="el-icon-success"></i>
                            <span>{{item2.authName}}</span>
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
        // 左侧菜单数据。
        menu: []
    }
  },
  methods: {
      handleLoginout() {
          localStorage.clear()
          this.$message.success('退出成功')
          this.$router.push('/login')
      },
      // 左侧导航修改，从数据库获取左侧菜单数据。。
      async getAsideMenu() {
          const res = await this.$http.get('menus')
          this.menu=res.data.data
          // console.log(res)
      }
  },
  created() {
      // 调用获取左侧菜单的方法。
      this.getAsideMenu()
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
