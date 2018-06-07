/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-04-20 11:49:38
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-07 11:54:39
 */
import axios from 'axios'
import {Notification} from 'element-ui'
let qs = require('qs')

let http = {get: () => {}, put: () => {}, delete: () => {}, post: () => {}, error: () => {}}

// get
http.get = (url, param, callback) => {
  axios.get(url, { params: param }).then((res) => {
    if (res.data.code === 1) {
      callback(res.data.data)
    } else {
      http.warn(res)
    }
  }).catch((err) => {
    http.error(err)
  })
}

// put
http.put = (url, param, callback, contentType) => {
  let headers = {}
  if (contentType && contentType === 'application/json') {
    headers = {'Content-Type': 'application/json'}
    console.log('json')
  } else {
    param = qs.stringify(param)
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    console.log('not json')
  }
  axios({method: 'put', url: url, data: param, headers: headers}).then((res) => {
    if (res.data.code === 1) {
      callback(res.data.data)
    } else {
      http.warn(res)
    }
  }).catch((err) => {
    http.error(err)
  })
}

// delete
http.delete = (url, param, callback) => {
  axios.delete(url, { params: param }).then((res) => {
    if (res.data.code === 1) {
      callback(res.data.data)
    } else {
      http.warn(res)
    }
  }).catch((err) => {
    http.error(err)
  })
}

// post
http.post = (url, param, callback) => {
  axios.post(url, qs.stringify(param)).then((res) => {
    if (res.data.code === 1) {
      callback(res.data.data)
    } else {
      http.warn(res)
    }
  }).catch((err) => {
    http.error(err)
  })
}

// 拦截request
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.resolve(err)
})

// 拦截response
axios.interceptors.response.use(data => {
  return data
}, err => {
  return Promise.resolve(err)
})

http.error = (err) => {
  // console.log(JSON.stringify(err))
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log('Error Response', err.response.data)
    Notification.error({message: err.response.data.error})
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log('Error Request', err.request)
    Notification.error({message: err.request})
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', err.message)
    // Notification.error({message: err.message})
    Notification.error({message: '数据接口请求失败，请检查网络连接'})
  }
}

http.warn = (res) => {
  // 异常处理,接口response的code非200时统一抛出message
  Notification.warning({message: res.data.message})
}
export default http
