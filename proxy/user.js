var models = require('../models');
var User = models.User;

exports.createAndNew = function (nickname, loginname, email, pass, callback) {
    var user = new User();
    user.loginname = loginname;
    user.nickname = nickname;
    user.email = email;
    user.pass = pass;
    user.save(callback);
}