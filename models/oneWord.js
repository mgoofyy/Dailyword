var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection); 

var OWSchema = new Schema({

    title:{
        type:String,
        //发布的名称(可以为空)
    },
    tag:{
        type:String,
        default:'0',
        //类型
    },
    place:{
        type:String,
        default:'',
        //发内容的地点
    },
    longitude:{
        type:String,
        default:'',
        //经度
    },
    latitude:{
        type:String,
        default:'',
        //纬度
    },
    content:{
        type:String
        //发布的内容
    },
    date:{
        type:Date,
        default: new Date(),
    },

    ownerId:{
        type:String,
        //发布者的id
    },

    ownerName:{
        type:String,
        //发布者的用户名
    },
    zanNumber :{
        type:String,
        default:'0',
        //赞的个数
    },
    zanPersons: {
        type:Array,
        default:null,
        //赞的人
    },
    comment:{
        type:Array,
        default:null,
        //评论列表
    }
});

OWSchema.plugin(autoIncrement.plugin, {               //自增ID配置
  model: 'OneWord',
  field: 'owId',
  startAt: 1000,
  incrementBy: 1
});

// 建立索引   owId 和发布的类型作为索引
OWSchema.index({
    owId: 1,
},{
    unique: true
});

OWSchema.index({
    tag: 1,
});


mongoose.model('OneWord',DPOSTSchema);