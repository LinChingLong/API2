import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import  { Row , Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store' 
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(Row)
// Vue.use(Button)

//添加全局前置導航守衛
router.beforeEach((to,from,next) => {
  //判斷token存不存在
  const token = Cookie.get('token')
  //token不存在，就說明當前用戶尚未登入，應跳轉至登入頁面
  if(!token && to.name !== 'login'){ //token不存在且當前路由對象不等於登入頁面
    next({name:'login'})
  }else if(token && to.name === 'login'){ //如果token存在，說明用戶已登入，此時跳轉至首頁
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),

  created(){ //用來解決畫面充新整理時白屏的問題
    store.commit('addMenu',router)
  }
}).$mount('#app')
