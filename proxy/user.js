var models = require('../models');
var User = models.User;

/**
 * nickname 昵称
 * loginname 登陆名称
 * email 邮箱
 * pass 密码
 * @callback 回调
 */
exports.createAndNew = function (nickname, loginname, email, pass, callback) {
    var user = new User();
    user.loginname = loginname;
    user.nickname = nickname;
    user.email = email;
    user.pass = pass;
    user.save(callback);
}