## 中间件

- 执行任何代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件

如果我的get,post请求中没有next参数，就匹配上一个路由，不会往下匹配。如果想往下匹配可以写 next();

## koa应用可使用如下几种中间件

- 应用级中间件：
app.use('匹配的路由',cb)，如果只有第二个参数,则表示匹配所有路由。 这个例子访问/test /user都是 '这是一个中间件'

```angular2html
//配置路由 koa-router
const router = require('koa-router')();

//匹配路由之前 应用级中间件
app.use(async (ctx,next)=>{
    ctx.body = '这是一个中间件'
})

//ctx包含req,res等信息
router.get('/test',async(ctx,next)=>{//ctx.query ctx.params
    ctx.body = 'test' //相当于原生的res.send()
}).get('/user',async(ctx,next)=>{//ctx.query ctx.params
    ctx.body = 'user' //相当于原生的res.send()
})
```

比如匹配路由之前 打印日期，访问每个路由的时候都会打印当前日期

```angular2html
app.use(async (ctx,next)=>{
    //匹配之前打印日期
    console.log(new Date());
    await next();//当前路由匹配后继续乡下匹配
})
```

- 路由级中间件：比如权限路由
- 错误处理中间件
```angular2html
//匹配路由之前 应用级中间件
app.use(async (ctx,next)=>{
    //匹配路由之前
    console.log(new Date());
    
    //匹配路由
    next();//当前路由匹配后继续乡下匹配
    
    //匹配路由之后
    if(ctx.status == '404'){
        ctx.status = 404;
        ctx.body = '这是一个404页面'
    }else{
        console.log(ctx.url)
    }
    //ctx.body = '这是一个中间件'
})
```
- 第三方中间件

## ejs
- 安装koa-views
- 安装ejs
 
- 循环数据
 ```angular2html
 <%for(var i = 0;i<users.length ;i++){%>
    <li><%=users[i]%></li>
    <%}%>
```
- 引入公用组件
```angular2html
<%include layout/header.ejs%>
```

- 解析html数据
```angular2html
<%-var%>
```

-公用数据设置

```angular2html
//设置公用的数据 每个模版中都可以引用username
app.use(async(ctx,next)=>{
    ctx.state.username = 'Joseph';
    await next();
});
```

获取公用数据
```angular2html
<h2><%=username%></h2>
```

获取提交数据:`ctx.request.body`

相比ejs art-template新能更好,而且语法也可以用{{}}这种绑定语法,相比更为方便，可查看官网使用方法

- cookie
60分钟后过期,path是设置可以访问的路径,domain正常不用设置,这里设置.baidu.com表示a.baidu.com,b.baidu.com等子域名都可以访问
`ctx.cookies.set('username','joe',{maxAge:60*1000*60,path:'/news',domain:'.baidu.com'})` 
`ctx.cookies.get('username')`

cookie设置中文value报错解决：
把中文转为base64格式

```angular2html
new Buffer('张三').toString('base64')
```

base64再转为中文
newe Buffer('asgxxx==','base64').toString()

- session
设置：`ctx.session.username='alice'`
获取：`ctx.session.username`

mongodb：
https://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/

引用路由模块
`app.use('/admin',routes)`