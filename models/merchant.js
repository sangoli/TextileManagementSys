const mongoose = require('mongoose');
const config = require('../config/database');
const Order = require('../models/orders');
const Agent = require('../models/agent');

const merchantSchema = mongoose.Schema(
    {
        ordersReceivedFromUsers : [
            String
        ],
        rankingOfAgent : [
            {
                username : String,
                score : Number
            }
        ]
    }
);

const Merchant = module.exports = mongoose.model('Merchant',merchantSchema);

module.exports.updateRankings = function (agent) {
    const orderAccept = agent.acceptOrders;
    const orderDecline = agent.declineOrders;
    const receivedOrders = agent.receivedOrders;
    const deliveredOrders = agent.deliveredOrders;
    const orderStatus = deliveredOrders/receivedOrders;
    if(orderStatus > 0.7 ){
        const weight = orderAccept*0.6 + orderDecline*(-0.7) + orderStatus*0.6
    }else{
        const weight = orderAccept*0.6 + orderDecline*(-0.7) + orderStatus*0.3
    }

    const username = agent.username;
    Agent.findOne({})


};

