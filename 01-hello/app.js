/**
 * Created by miyaye on 2019/8/1.
 */
const Koa = require('koa');
const app = new Koa();

//配置路由 koa-router
const router = require('koa-router')();

//引入koa-views配置中间件
const views = require('koa-views');

//引入bodyParser 获取post提交的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser()); //ctx.request.body  获取post请求data

//引入 session
const session = require('koa-session');
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 5000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,//在每次请求时强行设置cookie,这将重置cookie过期时间
    renew: true,//当session快过期时重置 如果5秒过了还没操作就过期
};
app.use(session(CONFIG, app));

//引入静态资源中间件 处理静态资源
const staticServe = require('koa-static');
app.use(staticServe('static'))

//配置html 后缀
//app.use(views('views',{map:{html:'ejs'}}));

//配置ejs后缀
app.use(views('views',{extension:'ejs'}))

//匹配路由之前 应用级中间件
app.use(async (ctx,next)=>{

    //匹配路由之前逻辑
    console.log(new Date());

    //当前路由匹配后继续乡下匹配
    await next();

    //路由匹配完成后会返回来执行中间件
    if(ctx.status == '404'){
        ctx.status = 404;
        ctx.body = '这是一个404页面'
    }else{
        //console.log(ctx.url)
    }

})
//设置公用的数据 每个模版中都可以引用username
app.use(async(ctx,next)=>{
    ctx.state.username = 'Joseph';
    await next();
});

//ctx包含req,res等信息
router.get('/test',async(ctx,next)=>{//ctx.query ctx.params
    //ctx.body = 'test' //相当于原生的res.send()
    ctx.cookies.set('username','alice')
    var title = 'hello world'
    await ctx.render('index',{title})
}).get('/user',async(ctx,next)=>{//ctx.query ctx.params
    //ctx.body = 'user' //相当于原生的res.send()
    console.log('session is:'+ctx.session.name)
    const name = ctx.cookies.get('username')
    const users = ['alice','joe','polyna'];
    await ctx.render('user',{users,name})
}).get('/login',async(ctx,next)=>{
    ctx.session.name='polyna';
    ctx.body = '成功';
})


app.use(router.routes()) //启动路由
    .use(router.allowedMethods())


app.listen(3000)