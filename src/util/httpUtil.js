/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-04-20 11:49:38
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2019-06-11 17:28:40
 */
import axios from 'axios'
import {Notification} from 'element-ui'
let qs = require('qs')

let http = {get: () => {}, all: () => {}, put: () => {}, delete: () => {}, post: () => {}, error: () => {}}

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

// all
http.all = (queryList, callback) => {
  let query = queryList.map((item) => {
    return axios.get(item.url, { params: item.param })
  })
  axios.all(query)
    .then((iterable) => {
      let flag = true
      iterable.map(res => {
        if (res.data.code === 0) {
          flag = false
          http.warn(res)
        }
      })
      if (flag) {
        callback(iterable)
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
  } else {
    param = qs.stringify(param)
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
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
http.post = (url, param, callback, contentType, responseType) => {
  let headers = {}
  if (contentType && contentType === 'application/json') {
    headers = {'Content-Type': 'application/json'}
  } else {
    param = qs.stringify(param)
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
  }
  responseType = responseType || 'json'
  axios({method: 'post', url: url, data: param, headers: headers, responseType: responseType}).then((res) => {
    if (responseType === 'arraybuffer') {
      callback(res.data)
    } else if (responseType === 'json') {
      if (res.data.code === 1) {
        callback(res.data.data)
      } else {
        http.warn(res)
      }
    }
  }).catch((err) => {
    http.error(err)
  })
}

// 拦截request
axios.interceptors.request.use(config => {
  let token = ''
  if (location.search.split('token=')[1]) {
    token = decodeURIComponent(location.search.split('token=')[1].split('/')[0])
  }
  config.headers.token = token
  return config
}, err => {
  return Promise.resolve(err)
})

// 拦截response
axios.interceptors.response.use(res => {
  if (res.data.code === 10) {
    location.href = res.data.data
  } else {
    return res
  }
}, err => {
  return Promise.resolve(err)
})

http.error = (err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Error Response', err.response.data)
    Notification.error({message: err.response.data.error})
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Error Request', err.request)
    Notification.error({message: err.request})
  }
}

http.warn = (res) => {
  // 异常处理,接口response的code非200时统一抛出message
  Notification.warning({message: res.data.message})
}
export default http
