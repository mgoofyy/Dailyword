var bcrpt = require('bcryptjs');
var config = require('../../config.js');

/**
 * 密码加密 手机号撒盐
 */
exports.passEncrty = function(pass,phone,callback) {
    var hashPhone = bcrypt.hashSync(phone, config.encrySalt);
    bcrypt.hash(pass, hashPhone, function(err, hash) {
         if(err) {
             return callback(err);
         }
         return callback(null,hash);
    });
};

