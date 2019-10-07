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
                        <a href="">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

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
        color:rgb(70, 68, 68);
    }
</style>
