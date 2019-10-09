<template>
  <el-card class="box-card">
      <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框-->
    <el-input clearable @clear="unloadList" placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="addUser" type="primary" plain>添加用户</el-button>
    <!--表格-->
    <el-table
      :data="userlist"
      height="250px"
      style="width: 100%">
      <el-table-column
      type="index"
     
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">   
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <!-- 作用域插槽 slot-scope,   -->
      <el-table-column
        label="创建时间">
        <!--通过slot-scope来获取源数据。-->
        <template slot-scope="userlist">
         {{userlist.row.create_time|fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" 
          inactive-color="#ff4949">
          </el-switch>

        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="openEdit(scope.row)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="openDelete(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,5,6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- 添加用户的模态框--->
  <el-dialog title="填写用户信息" :visible.sync="dialogFormVisibleAdd">
    <el-form :model="form">
      <el-form-item label="姓名:" :label-width='lableWidth'>
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="lableWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" :label-width="lableWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话:" :label-width="lableWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addSure">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑用户模态框-->
  <el-dialog title="修改用户信息" :visible.sync="dialogFormVisibleEdit">
    <el-form :model="form">
      <el-form-item label="姓名:" :label-width='lableWidth'>
        <el-input v-model="form.username" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" :label-width="lableWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话:" :label-width="lableWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      <el-button type="primary" @click="editSure">确 定</el-button>
    </div>
  </el-dialog>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
     userlist: [],
     // 分页数据
     pagenum: 1,
     pagesize: 2,
     query: '',
     total: -1,
     // 模态框
     dialogFormVisibleAdd: false,
     dialogFormVisibleEdit:false,
     lableWidth:'130',
     form:{
       username: '',
       password: '',
       email: '',
       mobile: '',
     }
    }
  },
  created(){
    this.getUrlList()
  },
  methods:{
    // 打开编辑用户,参数是传来的用户数据。
    openEdit(user) {
      // 显示用户修改框
      this.dialogFormVisibleEdit = true
      // 对form赋值，显示在编辑表单。
      this.form=user

    },
    // 确认修改用户信息
    async editSure() {
      // 次方法执行时，openEdit方法已经执行，所以id可以从哪个form对象获取。
      const res =  await this.$http.put(`users/${this.form.id}`,this.form)
      if(res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        
        this.dialogFormVisibleEdit = false

      }
    },
    // 获取用户数据。
    async getUrlList() {
      // 获取token值。
      const AUTH_TOKEN=localStorage.getItem('token')
      // 设置请求头。
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      // 发送请求。
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        // console.log(res)
        const {meta:{status,msg},data:{total,users}} = res.data
        if(status === 200){
          this.userlist = users
          //  console.log(this.userlist)
          this.total=total
       }else{
          this.$message.warning(msg)
       }
    },
    // 删除模态框方法。copy自elementUI
    openDelete(id) {
        this.$confirm('是否继续删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发送请求
          const res = await this.$http.delete(`users/${id}`)
          const {meta:{msg,status}} = res.data
          if(status===200){
            // 删除成功后默认回到第一页
            this.pagenum=1
            this.$message.success(msg)
          }
          // 重新获取用户列表
          this.getUrlList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    // 用户搜索。
    searchUser(){
      this.getUrlList()
    },
    // 确认添加时
     async addSure() {
      const res = await this.$http.post('users',this.form)
      // 结构赋值
      const {meta:{msg,status},data} = res.data
      if(status===201){
        // $message是elementui的对象
        this.$message.success(msg)
        // 添加成功时重新获取用户数据执行
        this.getUrlList()
        this.form = {}
        // 添加成功，关闭窗口。
        this.dialogFormVisible = false
      }else{
        // 未添加成功，轻空输入框。
        this.$message.warning(msg)
        this.form.username = ''
      }
    },
    addUser() {
      this.form={}
      this.dialogFormVisibleAdd=true
      
    },
    // 搜索框点击X时触发。重新获取数据。
    unloadList() {
      this.getUrlList()
    },
    // 当每页条数改变时触发下面方法。
    handleSizeChange(val) {
      this.pagenum = 1
      this.pagesize = val
      this.getUrlList()
    },
    // 当页码改变时。
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUrlList()
    }
  }
}
</script>

<style scoped>
  .box-card{
    height:100%; 
  }
  /** 模态框的input宽度 */
  .el-input{
    width:85%;
  }
  /** 搜索框的宽度 */
  .input-with-select[data-v-f5554e7e]{
    width:30%;
    margin:20px 0;
  }
  /** 分页 */
  .block{
    margin-top:18px;
  }
</style>
