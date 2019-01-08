const express = require('express');
const router = express.Router();
const agent_obj = require('../../models/agent');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

//test
/*router.get('/register', (req, res, next)=>{
    res.send('Welcome to agents page');
 });*/


//Register
router.post('/register', function (req, res, next) {
    let newAgent = new agent_obj({
        agency_name: req.body.agency_name,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        registration_number: req.body.registration_number,
        username: req.body.username,
        password: req.body.password,
        activeStatus: "1"
    });

    agent_obj.addAgent(newAgent, function (err, agent) {
        if (err) {
            res.json({success: false, msg: 'Failed to register agent'});
        } else {
            res.json({success: true, msg: 'Agent registered successfully!'});
        }
    });
//res.send('Welcome to register page');
});

//Authenticate
router.post('/authenticate', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    agent_obj.getUserByUserName(username, function (err, agent) {
        console.log(err);
        if (err) throw err;
        if (!agent) {
            console.log("agent not found");
            return res.json({success: false, msg: 'Agent not found'});
        }
        console.log("agent:", agent);
        agent_obj.comparePassword(password, agent.password, function (err, isMatch) {
            console.log("isMAtch:", isMatch);
            console.log(err);
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    "name": agent.name,
                    expiresIn: 605000
                }, "secret");
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    youruser: {
                        id: agent.__id,
                        name: agent.name,
                        username: agent.username,
                        email: agent.email
                    }
                });

            } else {
                return res.json({success: false, msg: 'invalid password'});
            }

        });
    });
//console.log('entering compare password');
//console.log("password:"+password, "agent.password:"+agent.password);
});

//Profile
router.get('/profile', function (req, res, next) {
    res.send('Welcome to profile page');
});


router.get('/orderforagents',function (req,res,next) {
   username = req.body.username;

});

router.post('/assignOrder',function (req,res) {

});



module.exports = router; //export the router to connect and show the page