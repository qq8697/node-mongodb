//加载express模块
var express=require('express')
//设置端口默认3000，也可以从命令行设置环境变量(PORT=4000 node app.js)
var port=process.env.PORT ||3000
//启动web服务
var app=express()
//设置视图根目录
app.set('views','./views')
//设置默认的模板引擎
app.set('view engine','jade')
//监听端口
app.listen(port)
//打印日志
console.log('start on port '+port)

//index page
app.get('/',function (req,res) {
	res.render('index',{
		title:'首页'
	})
})
//detail page
app.get('/movie/:id',function (req,res) {
	res.render('index',{
		title:'详情页'
	})
})
//admin page
app.get('/admin/movie',function (req,res) {
	res.render('index',{
		title:'后台页'
	})
})
//list page
app.get('/admin/list',function (req,res) {
	res.render('index',{
		title:'列表页'
	})
})