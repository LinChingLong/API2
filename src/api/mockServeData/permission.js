import Mock from 'mockjs'
export default {
    getMenu: config => {  //我們在這裡定義了一個getMenu方法，它接收我們傳遞進來的參數，分別是username和password然後做一個相應的判斷
        const {username,password} = JSON.parse(config.body)
        //先判斷用戶是否存在
        //判斷帳號和密碼是否對應
        if (username === 'ted' && password === 'ted'){
            return {
                code:20000,
                data:{
                    menu:[
                        {
                            path:'/home',
                            name:'home',
                            label:'首頁',
                            icon:'s-home',
                            url:'Home.vue'
                        },
                        {
                            path:'/mall',
                            name:'mall',
                            label:'商品管理',
                            icon:'video-play',
                            url:'Mall.vue'
                        },
                        {
                            path:'/user',
                            name:'user',
                            label:'用戶管理',
                            icon:'user',
                            url:'User.vue'
                        },
                        {
                            label:'其他',
                            icon:'location',
                            children:[
                                {
                                    path:'/page1',
                                    name:'page1',
                                    label:'頁面1',
                                    icon:'setting',
                                    url:'PageOne.vue'
                                },
                                {
                                    path:'/page2',
                                    name:'page2',
                                    label:'頁面2',
                                    icon:'setting',
                                    url:'PageTwo.vue'
                                }
                            ]
                        },
                    ],
                    token: Mock.Random.guid(),
                    message:'獲取成功'
                }
            }
        }else if (username === 'admin' && password === 'admin'){
            return{
                code:20000,
                data:{
                    menu:[
                        {
                            path:'/home',
                            name:'home',
                            label:'首頁',
                            icon:'s-home',
                            url:'Home.vue'
                        },
                        {
                            path:'/video',
                            name:'video',
                            label:'商品管理',
                            icon:'video-play',
                            url:'Mall.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message:'獲取成功'
                }
            }
        }else{
            return{
                code:-999,
                data:{
                    message:'密碼錯誤'
                }
            }
        }
    }
}