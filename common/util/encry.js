var bcrypt = require('bcryptjs');
var config = require('../../config.js');

/**
 * 密码加密 手机号撒盐
 */
exports.passEncrty = function(pass,phone,callback) {
    var salt = bcrypt.genSaltSync(10);
    var hashPhone = bcrypt.hashSync(phone, salt);
    bcrypt.hash(pass, hashPhone, function(err, hash) {
         if(err) {
             return callback(err);
         }
         return callback(null,hash);
    });
};

