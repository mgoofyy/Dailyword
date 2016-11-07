const express = require('express');
const router = express.Router();
const validator      = require('validator');
const eventProxy = require('eventproxy');
const tools = require('../../common/util/validateString.js');

// 处理接口逻辑
exports.signup = function(req,res,next) {
    var loginname = validator.trim(req.body.loginname).toLowerCase();
    var email     = validator.trim(req.body.email).toLowerCase();
    var pass      = validator.trim(req.body.pass);
    var rePass    = validator.trim(req.body.re_pass);
    console.log(loginname + email + pass + rePass);

    var ep = new eventProxy();

    ep.fail(next);

    ep.on('user_sign_ep_error',function(message){
        res.status(200);
        res.json({
            error:message,
             code:0,
            method:'POST'
        })
    });

    ep.on('user_sign_ep_success',function(message){
        res.status(200);
        res.json({
            code:'1',
            message:message,
            method:'POST'
        })
    });

    if ([loginname,email,pass,rePass].some(function(item){
        return item === '';
    })){
        return ep.emit('user_sign_ep_error','注册信息不完整');
    };

    if (loginname.length < 5) {
    ep.emit('user_sign_ep_error', '用户名至少需要5个字符');
    return;
    }
    if (!tools.validateId(loginname)) {
    return ep.emit('user_sign_ep_error', '用户名不合法');
    }
    if (!validator.isEmail(email)) {
        return ep.emit('user_sign_ep_error', '邮箱不合法');
    }
    if (pass !== rePass) {
        return ep.emit('user_sign_ep_error', '两次密码输入不一致');
    }

    return ep.emit('user_sign_ep_success','注册成功');
}
