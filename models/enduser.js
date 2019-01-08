const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


//creating a user schema
const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email: {
        type : String,
        required: true
    },
    username :{
        type : String,
        required : true
    },
    password:{
        type : String,
        required:true
    },
    orders:[
        String
    ],
    catalogs:[
        String
    ]
});

//so that it can be used from outside
const user = module.exports = mongoose.model('User', userSchema );

module.exports.getUserById = function(id, callback){
    user.findById(id, callback);
};

module.exports.addUser = function(newUser, callback){
    user.find({email : newUser.email}, function (err,docs) {
        if (docs.length){
            console.log("Exist")
        }else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                });
            });
        }
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    console.log("candidatePassword:"+candidatePassword, "hash:"+hash);
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        console.log(err);
    if(err) throw err;
    callback(null, isMatch);
});
};

module.exports.getUserByUserName = function(username, callback){
    const query = {'username': username };
    user.findOne(query, callback);
};


module.exports.addOrders = function (username,orderId,callback) {
    user.update({username: username},{
    $push : {orders : orderId}
    },callback);
};

