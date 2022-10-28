import http from '../utils/request'

//mock.js文件裡面定義完mock攔截器後，下方定義請求api

// 定義一個請求首頁數據的街口
export const getData = () => {
    //返回一個promise對象
    return http.get('/home/getData')
}
export const getUser = (params) => {
    // console.log(params,'params')
    //返回用戶列表
    return http.get('/user/getUser',params)
}
export const addUser = (data) => {
    return http.post('/user/add',data)
}
export const editUser = (data) => {
    return http.post('/user/edit',data)
}
export const delUser = (data) => {
    return http.post('/user/del',data)
}

export const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}