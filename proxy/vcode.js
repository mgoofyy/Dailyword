var modules = require('../modules');
var Vcode = modules.Vcode;

/**
 * 新建一个验证码
 */
exports.createAndNew = function(phone,code,next){
    var vcode = new Vcode();
    vcode.code = code;
    vcode.phone = phone;
    vcode.save(next);
};

/**
 * 删除一个验证码
 */
exports.delete = function(phone,next){
    Vcode.remove(query,next);
}

/**
 * 查找一个验证码
 */
exports.findOne = function(phone,next) {
    OneWord.find({'phone':phone}, '', {}, next);
}