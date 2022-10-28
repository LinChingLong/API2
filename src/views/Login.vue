<template>
    <!-- element UI表單邏輯，整個的form表單是由el-form和el-form-item和表單域中的其他組件組成的，這是form表單的基本布局-->
    <el-form ref="form" label-width="70px" :inline="true" class="login_container" :model="form" :rules="rules"> 
        <!-- 驗證功能在表單上面添加rules屬性 -->
        <h3 class="login_title">系統登入</h3>
        <el-form-item label="用戶名" prop="username">
            <el-input v-model="form.username" placeholder="請輸入帳號"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
            <el-input type="password" v-model="form.password" placeholder="請輸入密碼"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 105px;margin-top: 10px;" type="primary">登入</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
// 引入cookie前先指令安裝 npm i js-cookie@3.0.1
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    data() {
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,trigger:'blur',message:'請輸入用戶名'}
                ],
                password:[
                    {required:true,trigger:'blur',message:'請輸入密碼'}
                ]
            }
        }
    },
    methods:{
        //登入
        submit(){
            // //token信息(寫死)
            // const token = Mock.Random.guid()
            // //token信息存入cookie用於不同頁面間的通信
            // Cookie.set('token',token)

            //校驗通過
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({data}) => {
                        console.log(data)
                        if(data.code === 20000){
                            //token信息存入cookie用於不同頁面間的通信
                            Cookie.set('token',data.data.token)

                            //獲取菜單的數據，存入store中
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            //跳轉至首頁
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login_container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login_title{
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .el-input{
        width: 198px;
    }
}
</style>
<!-- 
    Q:菜單權限的獲取需要解決的問題:
    1.不同帳號登入，會有不同的菜單權限
    2.通過url輸入地址來顯示頁面
    3.對於菜單的數據在不同頁面之間的數據通信
-->