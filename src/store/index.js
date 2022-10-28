import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)

//創建vuex的實例(也是我們常說的store)
export default new Vuex.Store({
    modules:{
        tab
    }
})