import $ from 'jquery'
require('../common/gbfl')
export default class BizService {
  constructor () {
    this.manageHost = 'http://localhost:10002'
    this.fileUploadHost = 'http://localhost:8888'
    this.fileSystemHost = 'http://localhost:9999'
    this.method = {
      // 账单列表
      getBillList: '/bill/list',
      // api列表
      getApiCategoryPageList: '/consumer/get-apicategory-list',
      getApiCategoryDetail: '/consumer/get-apicategory-detail',
      addApiCategory: '/admin/add-apicategory',
      testXml: '/admin/test-param-xml',
    }
  }
  ajaxRequest (url, sendData, type, callback, contentType, async, beforeSend) {
    var result = null
    // var userToken = GBFL.Cache.get('user-token')
    var headers = {}
    // if(userToken && userToken.key && userToken.token){
    //   headers = {
    //     'userkey': userToken.key,
    //     'usertoken': userToken.token
    //   }
    // }
    
    $.ajax({
      url: url,
      type: type || 'GET',
      async: async === undefined || async,
      contentType: contentType === undefined ? 'application/x-www-form-urlencoded' : contentType,
      data: contentType === 'application/json' ? JSON.stringify(sendData) : sendData,
      headers: headers,
      // dataType: 'JSONP',
      // data: $.extend(sendData, {token: FDPX.logOn.token}),
      timeout: 60000,
      // dataType: 'json',
      beforeSend: beforeSend || function (request) {
      },
      complete: function () {},
      success: function (data, textStatus) {
        try {
          if (callback) {
            callback(null, data)
          }
          result = data
        } catch (e) {
          console.log(e)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        try {
          if (callback) {
            console.log(XMLHttpRequest)
            callback(textStatus || new Error('网络错误'), XMLHttpRequest)
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    return result
  }
  bizRequest (url, sendData, type, callback, contentType, async, beforeSend) {
    var result = null
    this.ajaxRequest(url, sendData, type, function (err, data) {
      if (!err) {
        if (data) {
          if (data.returnCode !== 'FRA-99999') {
            // 成功，更新token
            if (data.status === 1 || data.status === '200') {
              result = data
              data.status = true
            }
            if (data.status === 0 || data.status !== '200') {
              console.log(data && data.message ? data.message : 'error!')
            }
            if (callback) {
              callback(data.status, data)
            }
          } else {
          }
        } else {
          if (callback) {
            callback(null, data)
          }
        }
      } else {
        console.log('bizRequest error : ' + err)
      }
    }, contentType, async, beforeSend)
    return result
  }
  getBillList (params, callback) {
    var url = this.manageHost + this.method.getBillList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getApiCategoryPageList (params, callback) {
    var url = this.manageHost + this.method.getApiCategoryPageList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getApiCategoryDetail (params, callback) {
    var url = this.manageHost + this.method.getApiCategoryDetail
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addApiCategory (params, callback) {
    var url = this.manageHost + this.method.addApiCategory
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  testXml (params, callback) {
    var url = this.manageHost + this.method.testXml
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
    
}
