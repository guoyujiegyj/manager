<template>
    <!-- 使用自定义组件，并传值-->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
</template>
<script>
export default {
    data() {
        return{
            roleLists:[]
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
           
            const res = await this.$http.get('rights/list')
            this.roleList=res.data.data
        }
    }
}
</script>
<style lang="" scoped>
    
</style>