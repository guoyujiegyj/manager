<template>
<el-card class="box-card">
    <!-- 使用自定义组件，并传值-->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 权限列表-->
    <el-table :data='roleLists' height='460px' border style='width: 100%'>
        <!-- label是表头。prop是值。-->
        <el-table-column label='#' type='index' width='180'></el-table-column>
        <el-table-column prop='authName' label='权限名称' width='180'>  </el-table-column>
        <el-table-column prop='path' label='路径'></el-table-column>
        <el-table-column prop='level' label='层级'> 
            <!--将数字层级显示为汉字的处理-->
            <template slot-scope='scope'>
                <span v-if='scope.row.level==="0"'>一级</span>
                <span v-if='scope.row.level==="1"'>二级</span>
                <span v-if='scope.row.level==="2"'>三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>    
</template>
<script>
export default {
    data() {
        return{
            roleLists: []
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
           
            const res = await this.$http.get('rights/list')
            this.roleLists=res.data.data
        }
    }
}
</script>
<style lang="" scoped>
    
</style>