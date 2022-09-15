import axios from 'axios'
import { ElMessage  } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: process.env["VUE_APP_BASE_API "], // api 的 base_url  后端的url
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 处理请求异常
    Promise.reject(error).then(r =>  ElMessage ({
      message: r,
      type: 'error',
      duration: 5 * 1000
    }) )
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    const res = response.data
    if (res.code < 0) {
      ElMessage ({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    ElMessage ({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
