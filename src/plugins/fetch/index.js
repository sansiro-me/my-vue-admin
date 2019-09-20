import axios from 'axios'
import { Message } from 'element-ui'
const http = new Object();

const baseURL = '/blog_api';

const queryStringify = (obj, prefix) => {
  const pairs = [];

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];

    if (typeof value === 'undefined') {
      continue;
    }

    const enkey = encodeURIComponent(key);
    let pair;

    if (typeof value === 'object') {
      pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    }
    else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
    }

    pairs.push(pair);
  }

  return pairs.join('&');
};


var instance = axios.create({
  timeout: 5000,
  baseURL,
  transformRequest: [function(data, headers) {
    if(data instanceof FormData) {
      return data;
    }

    if(data && data.__json__ === true) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
      data.__json__ = undefined;

      return JSON.stringify(data);
    }

    return queryStringify(data);
  }],
  validateStatus(status) {
    switch (status) {
    case 400:
      Message.error('请求出错')
      break
    case 401:
      Message.warning({
          message: '授权失败，请重新登录'
      })
      // store.commit('LOGIN_OUT')
      setTimeout(() => {
          window.location.reload()
      }, 1000)
      return
    case 403:
      Message.warning({
          message: '拒绝访问'
      })
      break
    case 404:
      Message.warning({
          message: '请求错误,未找到该资源'
      })
      break
    case 500:
      Message.warning({
          message: '服务端错误'
      })
      break
    }
    return status >= 200 && status < 300
  }
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 请求头添加token
    // if (store.state.UserToken) {
    //   config.headers.Authorization = `Bearer ${store.state.UserToken}`
    // }
    if (config.method === 'get') {
      config.params = config.data;
    }
  
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {

    } else {
      err.message = '连接服务器失败'
    }
    // Message.error({
    //     message: err.message
    // })
    return Promise.reject(err.response)
  }
)

http.get = function(url, data) {
  // let loading
  // if (!options || options.isShowLoading !== false) {
    // loading = document.getElementById('ajaxLoading')
    // loading.style.display = 'block'
  // }
  return new Promise((resolve, reject) => {
    instance
      .get(url, data)
      .then(response => {
        // if (!options || options.isShowLoading !== false) {
        //   // loading = document.getElementById('ajaxLoading')
        //   // loading.style.display = 'none'
        // }
        if (response.code === 0) {
          resolve({
            isSuccess: true,
            data: response.data,
            msg: response.msg
          })
        } else {
          Message.error({
            message: response.msg
          })
          
          resolve({
            isSuccess: false,
            data: response.data,
            msg: response.msg
          })
        }
      })
      .catch(msg => {
        console.log(msg)

        Message.error({
          message: msg
        })
      })
  })
}

http.post = function(url, options) {
  // let loading
  if (!options || options.isShowLoading !== false) {
    // loading = document.getElementById('ajaxLoading')
    // loading.style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, options.data ? options.data : '', options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          // loading = document.getElementById('ajaxLoading')
          // loading.style.display = 'none'
        }
        if (response.code === 0) {
          resolve({
            isSuccess: true,
            data: response.data,
            msg: response.msg
          })
        } else {
          Message.error({
            message: response.msg
          })
          
          resolve({
            isSuccess: false,
            data: response.data,
            msg: response.msg
          })
        }
      })
      .catch(msg => {
        console.log(msg)

        Message.error({
          message: msg
        })
      })
  })
}

export default http
