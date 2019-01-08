const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');

mongoose.connect(config.database);

mongoose.connection.on('connected',function () {
    console.log("Connected "+config.database)
});

const app = express();


app.use(function(req, res, next) { //allow cross origin requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());

//app.use(multer({dest:'./angular-src/src/assets/'}).single('file'));


const merchants = require('./routes/merchant/merchantsAPI');
const agents = require('./routes/agent/agentsAPI');
const endUsers = require('./routes/endusers/endUsersAPI');
const create = require('./routes/catalog-design/catalogDesignAPI');
const cart = require('./routes/cart/cartAPI');



// PORT
const port = 3001;

// CORS Middleware
app.use(cors());


app.use('/merchants',merchants);
app.use('/agents',agents);
app.use('/endUsers',endUsers);
app.use('/create',create);
app.use('/cart',cart);

// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);


app.use(express.static(path.join(__dirname,'public')));

app.get('/',function (req,res) {
    res.send("Invalid Endpoint")
});

app.listen(port, function () {
   console.log("Server Started on Port "+port);
});