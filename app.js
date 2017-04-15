//加载express模块
var express=require('express')
//设置端口默认3000，也可以从命令行设置环境变量(PORT=4000 node app.js)
var port=process.env.PORT ||3001
//启动web服务
var app=express()
// 引入path模块
var path=require('path')
// 引入body-parser模块
var bodyParser=require('body-parser')

//设置视图根目录
app.set('views','./views/pages')
//设置默认的模板引擎
app.set('view engine','jade')
// 设置静态资源的路径
app.use(express.static(path.join(__dirname,'bower_components')))
// 将表单数据格式化
app.use(bodyParser())
// express.bodyParser()?
// middleware (like bodyParser) is no longer bundled with Express and must be installed separately
// npm install body-parser
// app.use(require('body-parser')())

//监听端口
app.listen(port)
//打印日志
console.log('start on port '+port)


//index page
app.get('/',function (req,res) {
	res.render('index',{
		title:'首页',
		movies:[{
			title:'机械战警',
			_id:'1',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:'2',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:'3',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})
//detail page
app.get('/movie/:id',function (req,res) {
	res.render('detail',{
		title:'详情页',
		movie:{
			doctor:'whb',
			country:'china',
			title:'机械战警',
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			// swf文件embed进flash播放器
			summary:'故事简介xxxx'
		}
	})
})
//admin page
app.get('/admin/movie',function (req,res) {
	res.render('admin',{
		title:'后台页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})
//list page
app.get('/admin/list',function (req,res) {
	res.render('list',{
		title:'列表页',
		movies:[{
			title:'机械战警',
			_id:1,
			doctor:'whb',
			country:'china',
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'english',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			// swf文件embed进flash播放器
			summary:'故事简介xxxx'
		}]
	})
})