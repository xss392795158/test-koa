/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-13 10:19:13
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-13 16:43:21
 */

const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
  for (var url in mapping) {
      if (url.startsWith('GET ')) {
          var path = url.substring(4);
          router.get(path, mapping[url]);
          console.log(`register URL mapping: GET ${path}`);
      } else if (url.startsWith('POST ')) {
          var path = url.substring(5);
          router.post(path, mapping[url]);
          console.log(`register URL mapping: POST ${path}`);
      } else {
          console.log(`invalid URL: ${url}`);
      }
  }
}

function addControllers(router, dir) {
  var files = fs.readdirSync(path.resolve(__dirname, dir));// 返回值为一个存储文件目录中成员名称的数组
  var js_files = files.filter((f) => {
      return f.endsWith('.js');// ES6
  });

  for (var f of js_files) {
      console.log(`process controller: ${f}...`);
      let mapping = require(__dirname + '/controllers/' + f);
      addMapping(router, mapping);
  }
}

module.exports = function (dir) {
  let controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
      router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}