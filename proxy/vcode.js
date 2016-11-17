var modules = require('../modules');
var Vcode = modules.Vcode;

/**
 * 新建一个验证码
 */
exports.createAndNew = function(phone,type,code,next){
    var vcode = new Vcode();
    vcode.code = code;
    vcode.phone = phone;
    vcode.type = type;
    vcode.save(next);
};

/**
 * 删除一个验证码
 */
exports.delete = function(phone,type,next){
    Vcode.remove({'phone':phone,'type':type},next);
}

/**
 * 查找一个验证码
 */
exports.find = function(phone,type,next) {
    OneWord.find({'phone':phone,'type':type}, '', {}, next);
}