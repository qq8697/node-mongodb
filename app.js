// 加载express模块
var express=require('express')
// 引入path模块
var path=require('path')
// 引入body-parser模块
var bodyParser=require('body-parser')
// 引入mongoose 
var mongoose =require('mongoose')
// 引入Movie model
var Movie =require('./models/movie')
// 引入underscore
var _ =require('underscore')


//设置端口默认3000，也可以从命令行设置环境变量(PORT=4000 node app.js)
var port=process.env.PORT ||3000
//启动web服务
var app=express()

// 连接数据库
mongoose.Promise = global.Promise; 
// mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/imooc-nodeProj')

//设置视图根目录
app.set('views','./views/pages')
//设置默认的模板引擎
app.set('view engine','jade')
// 设置静态资源的路径
app.use(express.static(path.join(__dirname,'bower_components')))
// 将表单数据格式化
app.use(bodyParser())
// 添加moment
app.locals.moment=require('moment')

//监听端口
app.listen(port)
//打印日志
console.log('start on port '+port)


//index page
app.get('/',function (req,res) {
	Movie.fetch(function (err,movies) {
		if (err){
			console.log(err)
		}
		res.render('index',{
			title:'首页',
			movies:movies
		})	
	})
})

//detail page
app.get('/movie/:id',function (req,res) {
	// 拿到url上的参数值
	var id =req.params.id
	Movie.findById(id,function(err,movie) {
		if (err){
			console.log(err)
		}
		res.render('detail',{
			title:'详情页',
			movie:movie
		})
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

// admin update movie
app.get('/admin/update/:id',function(req,res) {
	var id = req.params.id;
	if(id){
		Movie.findById({_id:id},function(err,movie) {
			res.render('admin',{
				title:'后台更新页',
				movie:movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new',function (req,res) {
	var id =req.body.movie._id
	var movieObj=req.body.movie
	var _movie

	// 已经存在的电影
	if(id!=='undefined'){
		Movie.findById(id,function(err,movie) {
			if(err){
				console.log(err)
			}
			// 新对象替换老对象对应字段
			_movie=_.extend(movie,movieObj)
			// 保存
			_movie.save(function(err,movie) {
				if(err){
					console.log(err)
				}
				// 重定向到对应页面
				res.redirect('/movie/'+movie._id)
			})
		})
	}
	// 新的电影
	else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			year:movieObj.year,
			poster:movieObj.poster,
			language:movieObj.language,
			flash:movieObj.flash,
			summary:movieObj.summary
		})
		_movie.save(function(err,movie) {
			if(err){
				console.log(err)
			}
			// 重定向到对应页面
			res.redirect('/movie/'+movie._id)
		})
	}
})


//list page
app.get('/admin/list',function (req,res) {
	Movie.fetch(function (err,movies) {
		if (err){
			console.log(err)
		}
		res.render('list',{
			title:'列表页',
			movies:movies
		})	
	})
})