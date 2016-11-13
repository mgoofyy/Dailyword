var models = require('../models');
var User = models.User;
var encryTool = require('../common/util/encry.js');

/**
 * nickname 昵称
 * loginname 登陆名称
 * email 邮箱
 * pass 密码
 * @callback 回调
 */
exports.createAndNew = function (phone, pass, callback) {
    var user = new User();
    user.phone = phone;
    encryTool.passEncrty(pass,function(err,hash){
        user.pass = hash;
        user.save(callback);
    });  
};

/**
 * 更新用户信息
 * user 字段和用户模型一致
 */
exports.updateUser = function (userId,user,callback) {
    // var user = new User();
    User.update({userId:userId},{'$set':user},callback);
};

/**
 * 查找一个用户
 */
exports.findUserOne = function(query, opt,callback) {
    User.find(query, '', opt, callback);
};