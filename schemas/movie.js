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
MovieSchema.pre('save',function (next) {
	if (this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}
	next()
})

// 静态方法
MovieSchema.statics={
	// 取出所有数据
	fetch : function (cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	// 查询单条数据
	findById :function (id,cb) {
		// console.log('id的值为：',id)
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

// 模式导出
module.exports=MovieSchema