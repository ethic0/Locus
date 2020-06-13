var mongoose = require('mongoose');
var slug = require('slug');
var User= mongoose.model('User');

var OrderSchema = new mongoose.Schema({
  slug:{type:String, lowercase:true, unique:true},
 cust_name:{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
 email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
 contact:{type:Number,unique:true, required:[true,"cant't be blank"]},
 pickup_city:{type:String,unique:true,required:[true,"cant't be blank"]},
 pickup_add:{type:String,required:[true,"cant't be blank"]},
 recv_cont:{type:Number,required:true,required:[true,"cant't be blank"]},
 drop_city:{type:String, unique:true, required:[true,"cant't be blank"]},
 distance:{type:Number,required:[true,"cant't be blank"]},
 recv_add:{type:String,required:[true,"cant't be blank"]},
 pkg_length:{type:Number},
 pkg_breadth:{type:Number},
 pkg_height:{type:Number},
 pkg_wt:{type:Number},
 delivery:{type:String},
 charges:{type:Number}

}, {timestamps: true});

OrderSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});
OrderSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


OrderSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    createdAt: this.createdAt,
    id: this._id,
    cust_name:this.cust_name,
    email: this.email,
    contact:this.contact,
    pickup_city:this.pickup_city,
    pickup_add:this.pickup_add,
    recv_cont:this.recv_cont,
    drop_city:this.drop_city,
    distance:this.distance,
    recv_add:this.recv_add,
    pkg_length:this.pkg_length,
    pkg_breadth:this.pkg_breadth,
    pkg_height:this.pkg_height,
    pkg_wt:this.pkg_wt,
    delivery:this.delivery,
    charges:this.charges,
   
  };
};
mongoose.model('Order', OrderSchema);
