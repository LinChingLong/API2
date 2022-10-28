import Vue from 'vue'
import VueRouter from 'vue-router'
// 創建路由組件
import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Main from "../views/Main.vue"
import Mall from "../views/Mall.vue"
import PageOne from "../views/PageOne.vue"
import PageTwo from "../views/PageTwo.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter)

// 1.創建路由組件
// 2.將路由與組件進行insert
// 3.創建router實例
const routes = [
    //主路由
    { 
        path: '/', 
        component: Main,
        name:'Main',
        redirect:'/home', //重定義，這行的意思是當我們的路徑是/ (path: '/')的時候，重定義一下我們的首頁為home
        children:[
            //子路由或嵌套路由
            // { path: 'home',name:'home', component: Home }, //首頁
            // { path: 'user',name:'user', component: User }, //用戶管理
            // { path: 'mall',name:'mall', component: Mall }, //商品管理
            // { path: 'page1',name:'page1', component: PageOne }, //頁面一
            // { path: 'page2',name:'page2', component: PageTwo }, //頁面二
        ] 
    },
    {
        path:'/login',
        name:'login',
        component: Login
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
  
export default router
