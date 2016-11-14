var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection); 


var DPOSTSchema = new Schema({

    title:{
        type:String,
        //发布的名称(可以为空)
    },
    tag:{
        type:String,
        default:'0',
        //类型
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

DPOSTSchema.plugin(autoIncrement.plugin, {               //自增ID配置
  model: 'DPOST',
  field: 'postId',
  startAt: 1000,
  incrementBy: 1
});

DPOSTSchema.index({
    postId: 1,
},{
    unique: true
});


mongoose.model('DPOST',DPOSTSchema);

