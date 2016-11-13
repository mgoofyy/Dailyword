const jwt = require('jwt-simple');
const moment = require('moment');
const app = require('express')();
const config = require('../../config.js');

exports.verfity = function(token,callback) {

    if (token) {
        try {
            var decoded = jwt.decode(token, config.JWT_SIMPLE_TOKEN_APP_SECRET_STRING);
            console.log(decoded)
            if (decoded.expires <= Date.now()) {
                return callback(new Error('token已经失效'));
            } else {
                console.log('当前token解密后' + decoded)
                return callback(null, decoded.userid);
            }
        } catch (err) {
            return callback(err);
        }
    } else {
        return callback(new Error('token不存在'));
    }
}

exports.encode = function(userid,callback) {

    var expires = moment().add(config.JWT_SIMPLE_TOKEN_APP_SECRET_EXPIRES, 'days').valueOf();
    var token = jwt.encode({
        userid: userid,
        expires: expires
    },config.JWT_SIMPLE_TOKEN_APP_SECRET_STRING);

    return callback(token);
}