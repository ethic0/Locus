var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var User = mongoose.model('User');
var auth = require('../auth');


router.param('order', function(req, res, next, slug) {
  Order.findOne({ slug: slug})
    .populate('orders')
    .then(function (order) {
      if (!order) { return res.sendStatus(404); }

      req.order = order;

      return next();
    }).catch(next);
});

// router.route('/order').post((req,res)=>{
//   const  cust_name = req.body.cust_name;
//   const email = req.body.email;
//   const contact = req.body.contact;
//   const pickup_city = req.body.pickup_city;
//   const pickup_add = req.body.pickup_add;
//   const recv_cont = req.body.recv_cont;
//   const drop_city = req.body.drop_city;
//   const distance =req.body.distance;
//   const recv_add = req.body.recv_add;
//   const pkg_length = req.body.pkg_length;
//   const pkg_breadth = req.body.pkg_breadth;
//   const pkg_height = req.body.pkg_height;
//   const pkg_wt = req.body.pkg_wt;
//   const delivery = req.body.delivery;
//   const charges =req.body.charges;


//   const newOrder= new Order({
//     cust_name,
//     email,
//     contact,
//     pickup_city,
//     pickup_add,
//     recv_cont,
//     drop_city,
//     distance,
//     recv_add,
//     pkg_length,
//     pkg_breadth,
//     pkg_height,
//     pkg_wt,
//     delivery,
//     charges

//   });
//   newOrder.save()
//   .then(()=>res.json('Order Placed Successfully!'))
//   .catch(err=>res.status(400).json('Error' + err));
// });

router.post('/placeorder', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var order = new Order(req.body.order);

    // order.user = user;

    return order.save().then(function(){
      console.log(order.user);
      return res.json({order: order.toJSONFor(user)});
    });
  }).catch(next);
});

// return a poem
router.get('/orders', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.order.populate('orders').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({order: req.order.toJSONFor(user)});
  }).catch(next);
});











module.exports = router;
