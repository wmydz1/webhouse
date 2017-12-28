import axios from 'axios'
import _ from 'lodash'
import Config from "@/config"
import StringUtil from '@/utils/StringUtil.js'



let filterUrl = ['/login','/bind-user']

class ApiManager {

    constructor() {
        this.setBaseUrl()
    }

    setBaseUrl(baseUrl) {
        if (_.isUndefined(baseUrl)) {
            this.http = axios.create({
                baseURL: Config.apiPrefix
            })
        } else {
            this.http = axios.create()
        }
        // this.http.defaults.withCredentials = true
        this.http.defaults.headers.common = {
            // 'X-Requested-With': 'XMLHttpRequest'
        }
    }

    get(url, params) {
        let extras = StringUtil.buildQuery(params)
        if (extras != '') {
            if (url.indexOf('?', 0) == -1) {
                url += '?' + _.trim(extras, '&')
            } else {
                url += extras
            }
        }
        return this.startRequest('get', url, null)
    }

    post(url, params) {
        return this.startRequest('post', url, params)
    }

    postJson(url, params) {
        let postHttp = axios.create({
            baseURL: Config.apiPrefix
        })
        let self = this;
        return new Promise(async(resolve, reject) => {
            postHttp.post(url, JSON.stringify(params), { headers: { 'Content-Type': 'application/json' } }).then((res) => {
                self.compileResponse(res, resolve, reject)
            }).catch(error => {
                if (error.message && error.message.indexOf('timeout') !== -1) {
                    reject('postJson请求超时')
                } else {
                    reject('postJson网络请求错误')
                }
            })
        })
    }

    patch(url, params) {
        return this.startRequest('patch', url, params)
    }

    put(url, params) {
        return this.startRequest('put', url, params)
    }

    delete(url, params) {
        return this.startRequest('delete', url, params)
    }
    async startRequest(method, url, data) {
        let self = this
        return new Promise(async(resolve, reject) => {
            self.http({
                method: method,
                url: url,
                data: _.trim(StringUtil.buildQuery(data), '&'),
                params: {  }
            }).then((res) => {
                self.compileResponse(res, resolve, reject)
            }).catch(error => {

                if (error.message && error.message.indexOf('timeout') !== -1) {
                    reject('startRequest请求超时')
                } else {
                    reject('startRequest网络请求错误')
                  console.log(error.message);
                }
            })
        })
    }

    compileResponse(response, resolve, reject) {
        let result = response;
        resolve(Object.assign({}, {data: result.data, messagecode: result.resultCode }, result.result))
        // if (result.resultCode == 'SUCCESS'){
        //
        // }
        // else {
        //     reject('compileResponse网络请求错误')
        // }
    }

}

let apiManager = new ApiManager()

export default apiManager
