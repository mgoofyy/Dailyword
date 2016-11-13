var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require("./baseModel");
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection); 

var UserSchema = new Schema({
    nickname: {
        type: String
    }, //昵称
    sex: {
        type: String,
        default: '3',
    },
    loginname: {
        type: String,
        default:'',
    },
    realname: {
        type: String,
        default:'',
    }, //真实用户名
    age: {
        type: String,
        default: 0,
    }, //年龄
    email: {
        type: String,
        default:'',
    }, //email
    pass: {
        type: String
    }, //密码
    phone: {
        type: String
    }, //手机号
    place: {
        type: String
    }, //地点
    avater: {
        type: String,
        default:'',
    }, //头像地址
    signature: {
        type: String,
        default: '你还没有说过什么',
    }, //个性签名
    device: {
        type: String,
    }, //设备s
    isBlock: {
        type: Boolean,
        default: false
    }, //是否是黑名单
    isLock: {
        type: Boolean,
        default: false
    }, //是否被锁定
    score: {
        type: String,
        default: 0,
    }, //积分
    level: {
        type: String,
        default: 1,
    }, //级别
    isStar: {
        type: Boolean,
        default:false,
    }, //是否是星级用户
    isVip: {
        type: Boolean,
        default: false,
    }, //是否是会员
    isActive: {
        type: Boolean,
        default: false
    }, //是否活跃
    createDate: {
        type: Date,
        default: Date.now
    }, //创建日期
    updateDate: {
        type: Date,
        default: Date.now
    }, //资料更新日期

    token: {
        type: String,
    }, // access_token
});

UserSchema.plugin(BaseModel);

UserSchema.plugin(autoIncrement.plugin, {               //自增ID配置
  model: 'User',
  field: 'userId',
  startAt: 1000,
  incrementBy: 1
});

UserSchema.virtual('isAdvance').get(function () {
    return this.score > 1000 | this.isStar;
});

//建立索引  暂时建立三条索引

UserSchema.index({
    loginname: 1
}, {
    unique: true
});

UserSchema.index({
    email: 1
}, {
    unique: true
});

UserSchema.index({
    score: 1
});

UserSchema.pre('save', function (next) {
    var now = new Date();
    this.updateDate = now;
    next();
});

mongoose.model('User', UserSchema);