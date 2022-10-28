//創建這個tab.js 主要為了用來管理我們菜單數據
import Cookie from "js-cookie"
export default { //es6的語法，我們將當前的這個對象導出，導出之後再store資料夾裡的index.js裡面引入之後就可以放到modules裡面
    state: {
        isCollapse:false,  //用於控制菜單的展開以及收起
        tabsList:[ //麵包屑數據
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        //麵包屑數據
        menu:[]
    },
    mutations: {  
        //修改菜單的展開以及收起的方法
        collappseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新麵包屑數據
        selecMenu(state,val){ //mutations這個定義他有兩個參數，一個是state這個是固定寫法表示獲取我們當前的state對象，第二個是我們傳遞進來的數據，我們也給它定義一個變量先給它叫做val
            // console.log( val , 'val' )
            // 判斷添加的數據是否為首頁
            if( val.name !== 'home' ){
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if(index === -1){
                    state.tabsList.push(val)
                }
            }
        },
        //用來刪除指定的tag數據
        closeTag(state,item){
            // console.log(item,'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            // 首先獲取當前它的索引，使用findIndex，我們判斷一下item的name如果和我們傳遞近來的數據一至的話就返回它的索引
            state.tabsList.splice(index,1)
            //然後我們再來調用splice的方法，裡面的兩個參數，第一個是我們要開始刪除的位置，第二個是要刪除的個數
        },
        //設置menu的數據
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        //動態註冊路由
        addMenu(state,router){
            //判斷當前緩存中是否有數據
            if(!Cookie.get('menu')) return //如果Cookie.get('menu')不存在，後續的操作也不需要，所以直接return

            //如果數據存在首先我們要先把數據拿到
            const menu = JSON.parse(Cookie.get('menu')) 
            //拿到之後先把資料進行更新
            state.menu = menu 
            //組裝動態路由的數據
            const menuArray = []
            //首先對數據進行遍例，可以透過forEach這個方法
            menu.forEach(item => {
                //在遍例的過程中需要判斷有無子菜單
                if(item.children){ //如果有子菜單，children就是存在的，如果存在的話我們還需要對有子菜單它下面繼續進行遍例
                    item.children = item.children.map(item => {  //繼續遍例children這個屬性
                        item.component = () => import(`../views/${item.url}`) //遍例children的時候我們就需要給他進行數據的組裝
                        return item
                    })
                    menuArray.push(...item.children)
                }else{ //沒有子菜單
                    // console.log(item.url)
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // console.log(menuArray,'menuArray')
            
            //路由的動態添加  
            menuArray.forEach(item => {
                //動態添加路由是調用addRoute這個方法是實現的
                router.addRoute('Main',item)  
            })
        }
    }
}