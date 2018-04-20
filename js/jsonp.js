// https://github.com/webmodules/jsonp
import originJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  const defaultOpt = { prefix: `_jp${Date.now()}` }
  url += (url.indexOf('?') === -1 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, Object.assign({}, defaultOpt, option), (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let url = ''
  Object.keys(data).forEach((key) => {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  })

  return url ? url.substring(1) : ''
}

/**
 * 封装下请求方法
 * @param {Object} opt 
 * @param {String} [opt.baseUrl] 基础url
 * @param {String} opt.url 请求uri,最终被拼接为 baseUrl + url
 * @param {Object} [opt.data] 请求数据
 */
export function request (opt) {
  const data = Object.assign({}, opt.data || {})
  return jsonp((opt.baseUrl || '') + opt.url, data, opt.option)
}
