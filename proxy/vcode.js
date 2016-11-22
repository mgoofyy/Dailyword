var modules = require('../models');
var Vcode = modules.Vcode;

/**
 * 新建一个验证码 验证码的类型，1 注册 2 登陆 3找回密码
 */
exports.createAndNew = function(phone,type,code,next){
    var vcode = new Vcode();
    vcode.code = code;
    vcode.phone = phone;
    vcode.type = type;
    vcode.save(next);
};

/**
 * 删除一个验证码 验证码的类型，1 注册 2 登陆 3找回密码
 */
exports.delete = function(phone,type,next){
    Vcode.remove({'phone':phone,'type':type},next);
}

/**
 * 查找验证码 验证码的类型，1 注册 2 登陆 3找回密码
 */
exports.find = function(phone,type,next) {
    Vcode.find({'phone':phone,'type':type}, '', {}, next);
}