var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection); 

 var VCodeSchema = new Schema({
     code:{
         type: String,
     },
     //验证码
     phone:{
         type:String,
     },
     //手机号
     createDate:{
         type:Date,
         default:new Date(),
     },
     type:{
         type:String
     }//验证码的类型，1 注册 2 登陆 3找回密码
     //验证码创建日期
 });

VCodeSchema.plugin(autoIncrement.plugin, {               //自增ID配置
  model: 'VCode',
  field: 'vcId',
  startAt: 1000,
  incrementBy: 1
});

//建立手机号索引
 VCodeSchema.index({
    phone: 1
});

// 建立验证码类型索引
VCodeSchema.index({
    type:1
});


mongoose.model('VCode', VCodeSchema);