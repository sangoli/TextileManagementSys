const express = require('express');
const router = express.Router();
const cartAPI = require('../../models/cart');



router.post('/addToCart',function (req,res) {

    let cartElement = new cartAPI({
        username: req.body.username,
        catalogName : req.body.catalogName,
        lengthEntered: req.body.lengthEntered,
        totalCost: req.body.totalCost,
        catalogImage: req.body.catalogImage,
        clothName: req.body.clothName
    });
    console.log(cartElement);
    cartAPI.addToCart(cartElement,function (err) {
        if (err) {
            console.log(err);
            res.json({success: false, msg: 'Failed to Add item to cart'});
        } else {
            res.json({success: true, msg: 'Item Added Successfully!'});
        }
    });
});


router.post('/getCartItem',function (req,res) {

    const username = req.body.username;

    cartAPI.getCartItems(username,function (err,cartItems) {
        if (err){
            res.json({success: false, msg: 'Cannot get Cart Item'});
        }
        else
        {
            res.json(
                {
                    success : true,
                    cartItems : cartItems
                }
            )
        }
    });
});


router.post('/deleteCartItem',function (req,res) {
   const id = req.body.id;
   cartAPI.deleteCartItem(id,function (err,callback) {
       if (err){
           res.json({success : false, msg : 'Could Not be removed'});
       } else{
           res.json({success : true, msg : 'Item removed Successfully'});
       }
   })

});

module.exports = router;