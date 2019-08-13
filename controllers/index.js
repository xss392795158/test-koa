/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-13 10:15:23
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-13 14:14:18
 */
var fn_index = async (ctx, next) => {
  ctx.render('hello.html', {
    title: 'Welcome'
  });
};

var fn_signin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
    ctx.render('signin-ok.html', {
      title: 'Welcome',
      name: 'success'
    });
  } else {
    ctx.render('signin-failed.html', {
      title: '出错啦'
    });
  }
};

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
};