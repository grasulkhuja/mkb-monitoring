import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// axios.defaults.baseURL = `/api/v1/admin/`
axios.defaults.headers.common['Accept'] = `application/json`
axios.defaults.headers.common['Content-Type'] = `multipart/form-data`
axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.withCredentials = false
axios.defaults.timeout = 20000

axios.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem('token')
    if (access) {
      config.headers.Authorization = `Bearer ${access}`
    }
    return config
  },
  (error) => {
    Promise.reject(error).then()
  }
)

Vue.prototype.$http = axios
export default axios
