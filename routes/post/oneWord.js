const express = require('express');
const router = express.Router();
const token = require('../../common/util/token.js');
const oneWord = require('../../proxy/oneWord.js');
const User = require('../../proxy/user.js');
const eventProxy = require('eventproxy');

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

        var title =  req.body.title;
        var content = req.body.content;
        var tag = req.body.tag;
        var place = req.body.place;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;

        if([content].some(function(item){
            return item === '' || item == undefined;
        })){
          return ep.emit('oneword_plish_ep_error','提交信息非法');
        }

        if([title,place,longitude,latitude].some(function(item){
            return item == undefined;
        })){
            item = '';
        }
        
        User.findUserOne({'userId':userId},{},function(err,users){
            if (err) {
                return next(err);
            }
            if (users.length == 0) {
                return ep.emit('oneword_plish_ep_error','内部错误');
            }

            var user = users[0];

            oneWord.createOneWord(content,title,tag,userId,user.loginname,place,longitude,latitude,function(){
                return ep.emit('oneword_plish_ep_success', '新增内容成功');
            });
        }); 

    });

};


exports.deleteOneWord = function(req,res,next) {

    var owId = req.body.owId; 

    var ep = new eventProxy();

    ep.fail(next);

    ep.on('oneword_delete_ep_error', function (message) {
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        })
    });

    ep.on('oneword_delete_ep_success', function (message) {
        res.status(200);
        res.json({
            code: '1',
            message: message,
            method: 'POST'
        })
    });

    if(req.body.device == undefined) {
        return ep.emit('oneword_delete_ep_error','请求来源出错');
    }

    if(req.headers.token == undefined) {
        return ep.emit('oneword_delete_ep_error','未登录');
    }

    if(owId == undefined) {
        return ep.emit('oneword_delete_ep_error','请求数据出错');
    }

    oneWord.findOneWord({'owId':owId},{},function(err,oneWords){
            if (err) {
                return next(err);
            }
            console.log('0==============' + oneWords + owId);
            if (oneWords.length == 0) {
                return ep.emit('oneword_delete_ep_error','内部错误');
            }
            var oneword = oneWords[0];
            
            oneWord.deleteOneWord({'owId':owId},function(err,doc){
                if(err) {
                    return ep.emit('oneword_delete_ep_error','内部错误');
                } else {
                    return ep.emit('oneword_delete_ep_success', '删除成功');
                }
            });
    });
}