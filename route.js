const routes = require('./routes/index');
const users = require('./routes/user/users');
const sign  = require('./routes/user/sign');
const login = require('./routes/user/login');
const Post = require('./routes/post/post');
const oneWord = require('./routes/post/oneWord');

exports = module.exports = function(app) {
    app.use('/', routes); //请求API root URL
    app.post('/users/profile/update', users.update);  //
    app.post('/users/sign',sign.signup);  //注册
    app.post('/users/login',login.login); //登陆  密码登陆和验证码登陆
    app.post('/users/login/verfityCode',login.verfityCode); //获取登陆验证码

    //业务流
    app.post('/post/publish',Post.postContent); //发布一条内容
    app.post('/oneWord/publish',oneWord.oneWord); //发布一句话 一言
    app.post('/oneWord/delete',oneWord.deleteOneWord);
}