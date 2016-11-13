var config = {
    debug : true,

    //mongoose

    mongoose_db : 'mongodb://127.0.0.1/one',


    // encry
    
    encrySalt : 'JRTyXEV2hqPUi1ZQ',


    //token 
    //用于JWT框架加密string   有效期
    JWT_SIMPLE_TOKEN_APP_SECRET_STRING : 'ML50ANMLOZURHUT4FKZEGVCOSH2MIS',
    JWT_SIMPLE_TOKEN_APP_SECRET_EXPIRES : 15,
}

module.exports = config;