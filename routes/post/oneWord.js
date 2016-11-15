const express = require('express');
const router = express.Router();
const token = require('../../common/util/token.js');

// 发布一句话系统  

exports.oneWord = function(req,res,next) {
    var ep = new eventProxy();

    ep.fail(next);

    ep.on('oneword_plish_ep_error', function (message) {
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        })
    });

    ep.on('oneword_plish_ep_success', function (message) {
        res.status(200);
        res.json({
            code: '1',
            message: message,
            method: 'POST'
        })
    });

    

    if(req.body.device == undefined) {
        return ep.emit('oneword_plish_ep_error','请求来源出错');
    }

    if(req.headers.token == undefined) {
        return ep.emit('oneword_plish_ep_error','未登录');
    }

    token.verfity(req.headers.token,function(err,userId){
        if(err) {
            return ep.emit('oneword_plish_ep_error','Token非法');
        }

        if([age,email,loginname,realname,sex,signature].some(function(item){
            return item === '' || item == undefined;
        })){
          return ep.emit('oneword_plish_ep_error','提交信息非法');
        }
    })

};