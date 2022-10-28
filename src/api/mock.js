import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// //定義mock請求攔截 (console.log測試)
// Mock.mock('/api/home/getData', function(){
//     //攔截到請求後的處理邏輯
//     console.log('攔截到了');
//     return 1
// })

//定義mock請求攔截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// 此時我們的處理邏輯，首先拿到homeApi這個對象，然後獲取到他的下面getStatisticalData這個方法

//用戶列表的數據
//對於我們需要傳遞數據，並且能夠對數據庫產生影響的這種接口，定義是用post
Mock.mock('/api/user/add','post', user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)