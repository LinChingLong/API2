<template>
    <div class="tabs">
        <el-tag>
            <el-tag
                v-for="(item,index) in tags"
                :key="item.path"
                :closable="item.name !=='home'"
                :effect="$route.name === item.name ? 'dark' : 'plain'"
                @click="changeMenu(item)"
                @close="handleClose(item,index)"
                size="small"
                > 
                <!-- :effect這行是判斷我們當前路由的name屬性是不是等於我們當前所要渲染tag的name，如果相等給上dark否則就給plain做簍空的效果 -->
                {{ item.label }}
            </el-tag>
        </el-tag>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default{
    name:'CommonTag',
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    // mounted(){
    //     console.log(this.$route,this.tags);
    // }
    methods:{
        ...mapMutations(['closeTag']), //首先調用Mutations，然後傳入一個宿主，裡面的內容就是我們想獲得的Mutations裡的方法，這樣就能獲取tab.js裡面closeTag方法
        //點擊tag跳轉功能
        changeMenu(item){
            // console.log(item)
            this.$router.push({name:item.name})
        },
        //點擊tag刪除的功能
        handleClose(item,index){
            //調用store中的mutations
            this.closeTag(item)
            const length = this.tags.length

            //刪除之後的跳轉邏輯
            if(item.name !== this.$route.name){ 
            //第一種情況，如果當前item的name不等於當前路由的name，也就是我們點擊刪除標籤他於我們當前所顯示的路由他的name如果不一致，此時不做任何操作直接return
                return
            }
            if(index === length){
            //第二種情況，如果index不一樣，當前選中的tag索引和我們length相等，表示的是刪除的最後一項
                this.$router.push({
                    name:this.tags[index-1].name //此時是要獲取點擊刪除的tag的前一個tag路由的數據然後進行跳轉
                })
            }else{ //第三種情況，如果我們刪除的是位於中間的tag位置的內容，此時會往它後一個tag的內容進行數據跳轉
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>