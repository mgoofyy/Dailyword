var models = require('../models');
var OneWord = models.OneWord;

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