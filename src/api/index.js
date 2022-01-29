import axios from 'axios'
// axios.defaults.headers.get['Content-Type']='Application/json;charset=utf-8'
axios.interceptors.request.use(function (config) {
    if (config.method === 'get') {
        config.data = { unused: 0 }
    }
    config.headers['Content-Type'] = 'Application/json;charset=utf-8';
    // config.headers.Authorization='token';
    return config
})
// 用户登录
export const login = (username, password) => axios.post('/api/login', { username: username, password: password })
// 获取用户信息
export const getUserInfo = (user_id) => axios.post('/api/getUserInfo', { userId: user_id })
// 用户注册
export const register = (username, password, phone, sign) => axios.post('/api/register', { username: username, password: password, phone: phone, sign: sign })
// 获取电影列表，使用get请求时，传参要使用{params:{key:val}}形式
export const getPMovieList = (isPlay) => axios.get('/api/getPMovieList', { params: { isPlay: isPlay } })
// 获取影院列表(针对地区获取)
export const getCinemaList = (city, disNum) => axios.post('/api/getCinemaList', { city: city, disNum: disNum })
// 根据名字搜索电影或影院
export const matchMovieByName = (searchVal) => axios.post('/api/matchMovieByName', { searchVal: searchVal })
// 获取影院排片情况
export const getSchedule = (cId) => axios.get('/api/getSchedule', { params: { cId: cId } })
// 提交选座情况和订单
export const updateOrder = (user_id,scheduleData,orderSeatInfo, seatInfo, seatCount, totalPrice, radio) => axios.post('/api/updateOrder', {user_id:user_id, scheduleData: scheduleData,orderSeatInfo:orderSeatInfo, seatInfo: seatInfo, seatCount: seatCount, totalPrice: totalPrice, payType: radio })
// 获取订单列表，使用get请求时，传参要使用{params:{key:val}}形式
export const getOrderList = (user_id) => axios.get('/api/getOrderList', { params: { userId: user_id } })
// 修改个人信息
export const updateUInfo = (userId,phone,username,password,sign) => axios.post('/api/updateUInfo', {userId:userId, phone:phone,username:username,password:password,sign:sign})
