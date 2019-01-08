const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



//creating a order schema
const orderSchema = mongoose.Schema({
    details:{
        type: String
        // required: true
    },
    catalog:{
        type: String,
        required: true
    },
    catalogImage:{
      type: String,
      required: true
    },
    cost:{
      type: String,
      required: true
    },
    length:{
        type: String
        // required: true
    },
    statusForCustomer:{ // "placed","ready","delivered"
        type: String
        // required: true
    },
    statusForAgent:{ // "Received","Thread","Dye","Ready","Delivered"
        type: String
        // required: true
    },
    statusForMerchant:{    // "Received","Assigned","Ready","Delivered"
        type: String
        // required: true
    }

});



const order = module.exports = mongoose.model('Order', orderSchema );


module.exports.insertOrders = function (orderDetails,callback) {
  orderDetails.save(function (err, orderDetails) {
      if(err) throw callback(err);
      else{
          console.log(orderDetails._id);
          return callback(null,orderDetails._id);
      }
  })
};

module.exports.getOrderFromOrderID = function (orderId,callback) {
    const query = ({'_id':orderId});
    order.findOne(query,callback);
};

module.exports.getOrderFromOrderIDForAgent = function (orderId,callback) {
    const query = ({'_id':orderId , 'statusForAgent' : "Received"});
    order.findOne(query,callback);
};

module.exports.getOrderFromOrderIDForMerchant = function (callback) {
    const query = ({'statusForMerchant' : "received"});
    order.find(query,callback);
};
