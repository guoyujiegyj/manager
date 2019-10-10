<template>
<el-card class="box-card">
    <!-- 使用自定义组件，并传值-->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button type="primary">添加角色</el-button>
    <!--表格-->
    <el-table :data="roleList" height="400px" style="width: 100%">
      <el-table-column type="expand">
          <template slot-scope="scope">
                <el-row v-for='(item1, id) in scope.row.children' :key="id">
                    <!--第一列-->
                    <el-col :span='4'>
                        <el-tag type="success" >{{item1.authName}}</el-tag>
                    </el-col>
                    <!--第二列：后面的两大列。-->
                    <el-col :span='20'>
                        <!--此处的行是视觉上第二列的行-->
                        <el-row v-for='(item2,i) in item1.children' :key='i'>
                            <el-col :span='4'> 
                                <el-tag type="info">{{item2.authName}}</el-tag>
                            </el-col>
                            <!--最后一列-->
                            <el-col :span="20">
                                <el-tag type="warning " v-for='(item3,i) in item2.children' :key='i'>
                                    {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
          </template>
      </el-table-column>   
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <!-- 作用域插槽 slot-scope,   -->
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="openEdit(scope.row)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="openRol(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="openDelete(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
</el-card>    
</template>
<script>
export default {
    data() {
        return{
            roleList: []
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            const res = await this.$http.get('roles')
            this.roleList=res.data.data
            console.log(res)
        }
    }
}
</script>
<style lang="" scoped>
    
</style>