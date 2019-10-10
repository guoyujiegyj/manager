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
                        <el-tag @close='deleteRight(scope.row,item1.id)' closable type="success" >{{item1.authName}}</el-tag>
                        <i class='el-icon-arrow-right'></i>
                    </el-col>
                    <!--第二列：后面的两大列。-->
                    <el-col :span='20'>
                        <!--此处的行是视觉上第二列的行-->
                        <el-row v-for='(item2,i) in item1.children' :key='i'>
                            <el-col :span='4'> 
                                <el-tag @close='deleteRight(scope.row,item2.id)' closable type="info">{{item2.authName}}</el-tag>
                                <i class='el-icon-arrow-right'></i>
                            </el-col>
                            <!--最后一列-->
                            <el-col :span="20">
                                <el-tag @close='deleteRight(scope.row,item3.id)' closable type="warning " v-for='(item3,i) in item2.children' :key='i'>
                                    {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <span class='span1' v-if='scope.row.children.length===0'>未分配权限</span>
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
            <el-button @click="openModifyRight(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="openDelete(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限分配弹框-->
    <el-dialog title="权限分配" :visible.sync="dialogFormVisibleRight">
        <!-- :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]" 
            default-expand-all：默认展开节点。
            -->
        <el-tree
            :data='rightList'
            default-expand-all
            show-checkbox
            node-key="id"
            :default-checked-keys='arrCheckRightId'
            :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisibleRight = false">确 定</el-button>
        </div>
    </el-dialog>
</el-card>    
</template>
<script>
export default {
    data() {
        return{
            roleList: [],
            // 树形结构数据。
            dialogFormVisibleRight: false,
            // 权限列表
            rightList:[],
            defaultProps: {
                // 节点的子节点数据
                children: 'children',
                // 节点显示的名字
                label: 'authName'
            },
            // 当前角色已有的权限的id
            arrCheckRightId:[]
        }
    },
    created() {
        this.getRightList()
    },
    methods: {
        // 获取角色列表
        async getRightList() {
            const res = await this.$http.get('roles')
            this.roleList=res.data.data
            // console.log(res)
        },
        // 分配权限
        async openModifyRight(role) {
            // console.log(role)
            this.dialogFormVisibleRight = true
            // 获取权限列表
            const res = await this.$http.get(`rights/tree`)
            // console.log(res)
            this.rightList = res.data.data

            // 循环，遍历当前角色的权限id。
            role.children.forEach(item1 => {
                this.arrCheckRightId.push(item1.id)
                item1.children.forEach(item2 => {
                    this.arrCheckRightId.push(item2.id)
                    item2.children.forEach(item3 => {
                       this.arrCheckRightId.push(item3.id)
                    })
                })
            });
            console.log(this.arrCheckRightId)
        },
        // 删除权限请求。
        deleteRight(role,rightId) {
            // roles/:roleId/rights/:rightId
            this.$confirm('你正在进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求。
                this.$http.delete(`roles/${role.id}/rights/${rightId}`).then(res=>{
                    //  console.log(res)
                    if(res.data.meta.status===200) {
                        role.children = res.data.data
                    }
                })
                // res返回的是删除后剩余的权限
                
            this.$message({
                type: 'success',
                message: '删除角色成功!'
                });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
            
        }
    }
}
</script>
<style lang="" scoped>
    .span1{
        margin-left:400px;
    }
 
</style>