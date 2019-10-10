<template>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    // 组件名称
    name:"myBread",
    data(){
        return{

        }
    },
    props:["level1","level2"]
}
</script>
<style lang="" scoped>
    .el-breadcrumb{
        margin-bottom:20px;
    }
</style>
