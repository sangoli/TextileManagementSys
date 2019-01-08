const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const cartSchema = mongoose.Schema({
    username: {
        type : String,
        required: true
    },

    catalogName : {
        type : String,
        required: true},

    lengthEntered:{
        type:  String,
        required: true},

    totalCost:{
        type: Number,
        required: true},

    catalogImage:{
        type:  String,
        required: true},

    clothName:{
        type: String,
        required: true}
});

const cart = module.exports = mongoose.model('Cart', cartSchema);

module.exports.addToCart = function (cartItem,callback) {
    console.log(cartItem);
    cartItem.save(callback);
};


module.exports.getCartItems = function (username,callback) {
    const query = {username : username};
    cart.find(query,callback);
};


module.exports.deleteCartItem = function (id,callback) {
  const query = { _id : id};
  cart.find(query).remove(callback).exec();
};