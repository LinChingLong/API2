import axios from 'axios'

const http = axios.create({
    //通用請求的地址前綴
    baseURL:'/api',
    timeout:10000 //超時時間，設定最大請求時間，如果在這時間內後端沒有給響應我們就中止這個請求
})

// 添加請求攔截器
http.interceptors.request.use(function (config) {
    // 在發送請求之前做些甚麼
    return config;
  }, function (error) {
    // 對請求錯誤做些甚麼
    return Promise.reject(error);
  });

// 添加響應攔截器
http.interceptors.response.use(function (response) {
    // 對響應數據做點甚麼
    return response;
  }, function (error) {
    // 對響應錯誤做點甚麼
    return Promise.reject(error);
  });

export default http