var express = require('express');
var router = express.Router();
const validator = require('validator');
const eventProxy = require('eventproxy');
const tools = require('../../common/util/validateString.js');
const token = require('../../common/util/token.js');
const UserProxy = require('../../proxy/user.js');
var models = require('../../models');
var User = models.User;

exports.update = function(req,res,next) {
    var ep = new eventProxy();

    ep.fail(next);

    ep.on('user_update_ep_error', function (message) {
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        })
    });

    ep.on('user_update_ep_success', function (message) {
        res.status(200);
        res.json({
            code: '1',
            message: message,
            method: 'POST'
        })
    });
    var age = req.body.age;
    var email = req.body.email;
    var loginname = req.body.loginname;
    var realname = req.body.realname;
    var sex = req.body.sex;
    var signature = req.body.signature;

    if (req.body.device == undefined) {
       return ep.emit('user_update_ep_error','请求接口来源非法');
    }

    if (req.headers.token == undefined) {
      return ep.emit('user_update_ep_error','你还没有登陆哦');
    }

    token.verfity(req.headers.token,function(err,userId){
      console.log('++++++++++++' + err + '+++++++')
        if(err) {
            return ep.emit('user_update_ep_error','Token非法');
        }

        if([age,email,loginname,realname,sex,signature].some(function(item){
            return item === '' || item == undefined;
        })){
          return ep.emit('user_update_ep_error','提交信息非法');
        }
        
        UserProxy.updateUser(userId,{
          'age':age,
          'email':email,
          'loginname':'loginname',
          'realname':realname,
          'sex':sex,
          'signature':signature,
        },function(err){
            return ep.emit('user_update_ep_success','更新成功');
        });

    });


    
};

