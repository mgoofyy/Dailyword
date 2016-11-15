const token = require('../../common/util/token.js');
const User = require('../../proxy/user.js');
const Post = require('../../proxy/Dpost.js');
const express = require('express');
const router = express.Router();
const eventProxy = require('eventproxy');

exports.postContent = function(req,res,next) {

    var title = req.body.title;
    var content = req.body.content;
    var tag = req.body.tag;

    var ep = new eventProxy();

    ep.fail(next);

    ep.on('post_content_ep_error',function(message){
        res.status(200);
        res.json({
            error: message,
            code: 0,
            method: 'POST'
        });
    });

    ep.on('post_content_ep_success',function(message){
        res.status(200);
        res.json({
            data: message,
            code: 1,
            method: 'POST'
        });
    });

    if(req.body.device == undefined) {
        return ep.emit('post_content_ep_error', '请求来源非法');
    } 

    if(req.headers.token == undefined) {
        return ep.emit('post_content_ep_error', '未登录');
    }

    token.verfity(req.headers.token,function(err,userId){
        if(err) {
            return ep.emit('post_content_ep_error','Token非法');
        }

        if([title,content].some(function(item){
            return item == '' | item == undefined;
        })){
            return ep.emit('post_content_ep_error','信息不完整');
        };

        User.findUserOne({'userId':userId},{},function(err,users){
            if (err) {
                return next(err);
            }
            if (users.length == 0) {
                return ep.emit('post_content_ep_error','内部错误');
            }

            var user = users[0];

            Post.createPost(content,title,tag,userId,user.loginname,function(){
                return ep.emit('post_content_ep_success', '新增内容成功');
            });
        }); 

    });
};