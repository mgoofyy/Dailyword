var models = require('../models');
var OneWord = models.OneWord;

/**
 * 新增一个oneword
 */
exports.createOneWord = function (content,title,tag,ownerId,ownerName,place,longitude,latitude, callback) {
    
    var oneWord = new OneWord();
    oneWord.title = title;
    oneWord.content = content;
    oneWord.tag = tag;
    oneWord.ownerId = ownerId;
    oneWord.ownerName = ownerName;
    oneWord.latitude = latitude;
    oneWord.longitude = longitude;
    oneWord.place = place;
    oneWord.save(callback);

};

/**
 * 删除一个oneWord
 */
exports.deleteOneWord = function(query,next) {
    OneWord.remove(query,next);
}

/**
 * 根据查询条件查询一个oneword
 */
exports.findOneWord = function(query, opt,next) {
    OneWord.find(query, '', opt, next);
};