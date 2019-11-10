import axios from 'axios'
import store from '@/store/'
import config from '../config'

export default function enableInterceptor () {
  axios.interceptors.request.use((options) => {
    options.baseURL = config('API_URL')
    const token = store.getters.getToken
      console.log('debug token',token)
    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }
    return options
  })

  axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location = '/login'
    }
    return Promise.reject(error)
  })
}
