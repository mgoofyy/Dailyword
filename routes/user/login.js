const express = require('express');
const router = express.Router();
const validator = require('validator');
const eventProxy = require('eventproxy');
const tools = require('../../common/util/validateString.js');
const User = require('../../proxy/user.js');
const encry = require('../../common/util/encry.js');
const token = require('../../common/util/token.js');

// 短信验证码和密码登陆
exports.login = function(req,res,next) {
    var phone = validator.trim(req.body.phone);
    var pass = req.body.pass;
    var verfityCode = req.body.verfityCode;

    console.log(phone + pass + verfityCode);

    var ep = new eventProxy();

    ep.fail(next);

    ep.on('user_login_ep_error',function(message){
        // res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        });
    });

    ep.on('user_login_ep_success',function(message){
        // res.status(200);
        res.json({
            data: message,
            code: 1,
            method: 'POST'
        });
    });

    if(req.body.device == undefined) {
        return ep.emit('user_login_ep_error', '登陆来源非法');
    }

    if(phone == undefined) {
        return ep.emit('user_login_ep_error', ' 登陆信息非法');
    }  

    if (!tools.validatePhone(phone)) {
        return ep.emit('user_login_ep_error', '手机号格式错误');
    }

    if(verfityCode == undefined && pass == undefined) {
        return ep.emit('user_login_ep_error', ' 登陆信息非法');
    }  

    User.findUserOne({'phone':phone},{},function(err,users){
        if (err) {
            return next(err);
        }
        if (users.length == 0) {
            return ep.emit('user_login_ep_error','手机号还没有注册');
        }
        // 密码登陆
        if(verfityCode == undefined) {
            var user = users[0];            
            encry.passCheck(pass,user.pass,function(err,bool){
                if(bool) {
                    token.encode(user.userId,function(token){
                        user.token = token;
                        return ep.emit('user_login_ep_success',user);
                    });
                } else {
                        return ep.emit('user_login_ep_error','密码错误');
                } 
            });
        }
    }); 

    

    //验证码登陆
    if(pass == undefined) {

    }

};

//获取登陆验证码的接口 “最好把信息放到redis里面去” 暂存在mongose 设定90秒有效期 = 短信验证码每90秒可以重发一次
exports.verfityCode = function(req,res,next) {
    var phone = validator.trim(req.body.phone);
    var device = req.body.device;
    
    var ep = new eventProxy();

    ep.fail(next);

    ep.on('verfityCode_login_ep_error',function(message){
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        });
    });

    ep.on('verfityCode_login_ep_success',function(message){
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        });
    });

    if(req.body.device == undefined) {
        return ep.emit('verfityCode_login_ep_error', '来源非法');
    }

    if(phone == undefined) {
        return ep.emit('verfityCode_login_ep_error', '请求信息非法');
    } 

    if (!tools.validatePhone(phone)) {
        return ep.emit('verfityCode_login_ep_error', '手机号格式错误');
    }

};