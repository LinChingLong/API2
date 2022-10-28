<template>
    <div class="header_container">
        <div class="l-content">
            <el-button style="margin-right:20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 麵包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/IMG_3817.jpg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>個人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data(){
        return {}
    },
    methods:{
        handleMenu(){
            this.$store.commit('collappseMenu')
        },
        handleClick(command){
            if(command === 'cancel'){
                console.log('登出')
                //清除cookie中的token信息
                Cookie.remove('token')
                //清除cookie中的menu
                Cookie.remove('menu')
                //跳轉至登入頁面
                this.$router.push('/login')
            }
        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    // mounted(){ ////為了查看上面computed裡的...mapState有無成功作用
    //     console.log(this.tags,'tags')
    // }
}
</script>

<style lang="less" scoped>
.header_container{
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    .text{
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content{
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item{
            // /deep/這個是一種固定寫法，又叫做樣式的穿刺
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color:#666
                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                    color: #fff;
                }
            }
        }
    }
}
</style>