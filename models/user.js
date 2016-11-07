var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require("./baseModel");

var UserSchema = new Schema({
    nickname:{type: String}, //昵称
    realname:{type: String}, //真实用户名
    age:{type: String}, //年龄
    email:{type: String}, //email
    pass:{type: String}, //密码
    phone:{type: String}, //手机号
    place:{type: String}, //地点
    avater:{type: String}, //头像地址
    signature:{type: String}, //个性签名
    device:{type: Array}, //设备s
    isBlock:{type: Boolean,default: false}, //是否是黑名单
    isLock:{type: Boolean,default: false}, //是否被锁定
    score:{type: String}, //积分
    level:{type: String}, //级别
    isStar:{type: Boolean}, //是否是星级用户
    isVip:{type: Boolean},  //是否是会员
    isActive:{type: Boolean,default: false}, //是否活跃
    createDate:{type: Date,default: Date.now}, //创建日期
    updateDate:{type: Date,default: Date.now}, //资料更新日期

    token:{type: String}, // access_token
});

UserSchema.plugin(BaseModel);
