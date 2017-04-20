var mongoose = require ('mongoose')

// 定义模式
var MovieSchema = new mongoose.Schema({
	doctor : String,
	title : String,
	language : String,
	country : String,
	summary : String,
	flash : String,
	poster : String,
	year : String,
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
})

// 添加方法
// Schema.pre 

// 静态方法

// 取出所有数据

// 查询单条数据

// 模式导出