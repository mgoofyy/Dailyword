var models = require('../models');
var Post = models.DPOST;

exports.createPost = function (content, title,tag,ownerId,ownerName, callback) {
    
    var post = new Post();
    post.title = title;
    post.content = content;
    post.tag = tag;
    post.ownerId = ownerId;
    post.ownerName = ownerName;
    post.save(callback);
};