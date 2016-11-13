var bcrypt = require('bcryptjs');
var config = require('../../config.js');

/**
 * 密码加密 手机号撒盐
 */
exports.passEncrty = function(pass,callback) {
    bcrypt.hash(pass, 10, callback);
};

exports.passCheck = function(pass,hash,callback){
    bcrypt.compare(pass, hash, callback);
}

// exports.valitorPass = function(pass,)

