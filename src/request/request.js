//request.js
import axios from 'axios'
import {Toast} from 'vant'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['AdminToken'] = 'mima'

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_API)

// 创建axios实例 需要loading加载
const request = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 100000 // 请求超时时间
})
//不需要loading加载
const requestloading = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 100000 // 请求超时时间
})

function startLoading() {
    // 开始加载
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
}

function endLoading() {
    // 结束加载
    Toast.clear()
}

// 添加request拦截器 加载loading
requestloading.interceptors.request.use(config => {
    startLoading()
    return config
}, error => {
    Promise.reject(error)
})
// 添加respone拦截器 加载loading
requestloading.interceptors.response.use(
    response => {
        endLoading()
        return Promise.resolve(response.data)
    },
    error => {
        startLoading()
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log(401)
                    break;
                case 403:
                    console.log(403)
                    break;
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    })
                    console.log(404)
                    break;
                case 500:
                    console.log(500)
                    break;
            }
        }
        return Promise.reject(error.response)
    }
)


// 添加request拦截器 不加载loading
request.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})
// 添加respone拦截器 不加载loading
request.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        startLoading()
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log(401)
                    break;
                case 403:
                    console.log(403)
                    break;
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    })
                    console.log(404)
                    break;
                case 500:
                    console.log(500)
                    break;
            }
        }
        return Promise.reject(error.response)
    }
)
// export default request
export let req = request
export let reqloading = requestloading

