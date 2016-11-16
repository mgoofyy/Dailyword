const express = require('express');
const router = express.Router();
const validator = require('validator');
const eventProxy = require('eventproxy');
const tools = require('../../common/util/validateString.js');
const User = require('../../proxy/user.js');

// 处理接口逻辑 - 手机验证码注册
exports.signup = function (req, res, next) {
    var phone = validator.trim(req.body.phone).toLowerCase();
    var pass = req.body.pass;
    var verfityCode = validator.trim(req.body.verfityCode);
    console.log(phone + pass + verfityCode);

    var ep = new eventProxy();

    ep.fail(next);

    ep.on('user_sign_ep_error', function (message) {
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        })
    });

    ep.on('user_sign_ep_success', function (message) {
        res.status(200);
        res.json({
            code: '1',
            message: message,
            method: 'POST'
        })
    });

    if(req.body.device == undefined) {
        return ep.emit('user_sign_ep_error', '注册来源非法');
    }
    if ([phone, pass, verfityCode].some(function (item) {
            return item === '';
        })) {
        return ep.emit('user_sign_ep_error', '注册信息不完整');
    };
    if (!tools.validatePhone(phone)) {
        return ep.emit('user_sign_ep_error', '手机号格式错误');
    }

    User.findUserOne({'phone':phone},{},function(err,users){
        if (err) {
            return next(err);
        }
        if (users.length > 0) {
            return ep.emit('user_sign_ep_error','手机已经被注册');
        }
        User.createAndNew(phone,pass,function(){
            return ep.emit('user_sign_ep_success', '注册成功');
        });
    });  
}

//验证码注册

exports.verfityCode = function(req,res,next) {

};

