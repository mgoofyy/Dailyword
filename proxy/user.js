var models = require('../models');
var User = models.User;
var encryTool = require('../common/util/encry.js');

/**
 * 创建一个新的用户
 */
exports.createAndNew = function (phone, pass, callback) {
    var user = new User();
    user.phone = phone;
    encryTool.passEncrty(pass,phone,function(err,hash){
        if(err) {
            return next(err);
        } else {
            user.pass = hash;
            user.save(callback);
        }
    });
    
    
};

/**
 * 查找一个用户
 */
exports.findUserOne = function(query, opt,callback) {
    User.find(query, '', opt, callback);
};