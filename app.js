/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-13 09:53:32
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-13 16:30:40
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const nunjucks = require('nunjucks');
const templating = require('./templating');
const controller = require('./controller');
let staticFiles = require('./static-files');
const app = new Koa();
/* var files = fs.readdirSync(__dirname + '/controllers');
var js_files = files.filter((f)=>{
  return f.endsWith('.js');
});

for (var f of js_files) {
  console.log(`process controller: ${f}...`);
  // 导入js文件:
  let mapping = require(__dirname + '/controllers/' + f);
  for (var url in mapping) {
      if (url.startsWith('GET ')) {
          // 如果url类似"GET xxx":
          var path = url.substring(4);
          router.get(path, mapping[url]);
          console.log(`register URL mapping: GET ${path}`);
      } else if (url.startsWith('POST ')) {
          // 如果url类似"POST xxx":
          var path = url.substring(5);
          router.post(path, mapping[url]);
          console.log(`register URL mapping: POST ${path}`);
      } else {
          // 无效的URL:
          console.log(`invalid URL: ${url}`);
      }
  }
} */

// app.use(async (ctx, next) => {
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//   await next();
// });
// router.get('/hello/:name', async (ctx, next) => {
//   var name = ctx.params.name;
//   ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

// router.get('/', async (ctx, next) => {
//   ctx.response.body = `<h1>Index</h1>
//       <form action="/signin" method="post">
//           <p>Name: <input name="name" value="koa"></p>
//           <p>Password: <input name="password" type="password"></p>
//           <p><input type="submit" value="Submit"></p>
//       </form>`;
// });
// router.post('/signin', async (ctx, next) => {
//   var name = ctx.request.body.name || '',
//       password = ctx.request.body.password || '';
//   console.log(`signin with name: ${name}, password: ${password}`);
//   if (name === 'koa' && password === '12345') {
//       ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//   } else {
//       ctx.response.body = `<h1>Login failed!</h1>
//       <p><a href="/">Try again</a></p>`;
//   }
// });
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var start = new Date().getTime(),
      execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(bodyParser());// koa-bodyparser必须在router之前被注册到app对象上
app.use(templating('views', {
  // noCache: !isProduction,
  noCache: false,
  // watch: !isProduction
  watch: true
}))
// app.use(router.routes());
app.use(controller());
/* app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
}); */
/* app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
}); */
/* var s = env.render('hello.html', { 
  name: '<script>alert("小明")</script>',
  fruits: ['app', 'banaba', 'orange']
});
var s2 = env.render('extend.html', {
  // header: 'Hello',
  body: 'bla bla bla...'
}); */
// console.log(s);
// console.log(s2);
app.listen(3002);