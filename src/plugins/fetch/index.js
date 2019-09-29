import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const http = {};

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

// 创建实例
const instance = axios.create({
  timeout: 30000,
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
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
  if (config.method === 'get') {
    config.params = config.data;
  }

  return config
}, error => {
  // 错误处理
  return Promise.reject(error)
})

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    if(response.data.code == '-101') {
      // 登陆过期
      store.commit('permission/logout')

      // router.push({ path: '/login' })
      window.location.reload();
    }

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
      .post(url, options.data ? options.data : '')
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

// export default http


export default function(url, options = {}) {
  if (options.upload === true) {
    const fd = new FormData();

    for (const key in options.data) {
      fd.append(key, options.data[key]);
    }

    options.data = fd;
  }

  return instance(url, options)
    .then(response => {
      if (response.code === 0) {
        return {
          isSuccess: true,
          data: response.data,
          msg: response.msg
        };
      }
      else {
        Message.error({
          message: response.msg
        })
        
        return {
          isSuccess: false,
          data: response.data,
          msg: response.msg
        };
      }
    }).catch(msg => {
      console.log(msg)

      Message.error({
        message: msg
      })
    })
}
