const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/Foodsite")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})
const orderSchema = new mongoose.Schema({
    Useremail:{
        type:String,
        required:true
    },Username:{
        type:String,
        required:true
    },Orderdetails: [
        {
            Foodimage:String,
          Foodname: String,
          Price: Number,
          Quantity: Number
        }
      ]
})

const cartSchema = new mongoose.Schema({
    Useremail:{
        type:String,
        required:true
    },Username:{
        type:String,
        required:true
    },Cartdetails: [
        {
            Foodimagecart:String,
          Foodnamecart: String,
          Pricecart: Number,
          Ratingcart: Number
        }
      ]
})

const foodSchema = new mongoose.Schema({
    image:{//change image on caps
        type:String,
        required:true
       
    },
    Rating:{
        type:Number,
        required:true
    },
    Foodname:{
        type:String,
        required:true
           
    }, Price:{
        type:Number,
        required:true
        
    },Quotes:{
        type:String,
        required:true
    }

})
const notificationSchema = new mongoose.Schema({
    Useremail:{
        type:String,
        required:true
           
    }, Username:{
        type:String,
        required:true
        
    },Notificationdata:[
        {
        Notification:String
        }
    ]
})

const addressschema = new mongoose.Schema({
    Useremail:{
        type:String,
        required:true
           
    }, Username:{
        type:String,
        required:true
    },Doorno:{
        type:String,
        required:true
        
    },Village:{
        type:String,
        required:true

    },District:{
        type:String,
        required:true

    },Pincode:{
        type:Number,
        required:true

    }
})
const collection = mongoose.model("Loginvalues",userSchema)
const collectionorder = mongoose.model("Ordervalues",orderSchema)
const collectioncart = mongoose.model("Cartvalues",cartSchema)
const collectionfood = mongoose.model("Foodvalues",foodSchema)
const collectionnotify = mongoose.model("Notification",notificationSchema)
const collectionaddress = mongoose.model("Address",addressschema)

module.exports = {
    collection,
    collectionorder,
    collectionfood,
    collectioncart,
    collectionnotify,
    collectionaddress
    
  };
