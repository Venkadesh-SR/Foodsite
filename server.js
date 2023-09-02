const express = require("express")
const { collection, collectionorder,collectionfood,collectioncart,collectionnotify,collectionaddress} = require('./mongo');
const cors = require("cors")
const server = express()
const bodyParser = require("body-parser");
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())


server.use(bodyParser.json());

server.post("/Homemain",async(req,res) =>{
   const {emailinput} = req.body
    
    try{
        
        const all = await collection.find({email:emailinput})

        if(all){
            res.json(all)
           
        }

    }
    catch(error){
        console.log(error)
    }
})


server.post("/signin",async(req,res)=>{
    const{email,password}=req.body

    try{
        
        const check=await collection.findOne({email:email,password:password}) 
        const check1=await collection.findOne({email:email})
        

        if(check){
            res.json("exist")
           
        }
        else if(check1){
            res.json("detail")
        }
       
        else {
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }
   

})


server.post("/signup",async(req,res)=>{
    const{name,email,mobileno,password,cpassword}=req.body
    
    const data={
        
        name:name,
        email:email,
        mobileno:mobileno,
        password:password,
        cpassword:cpassword
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        } 

    }
    catch(e){
       return res.json("fail")
    }

})

server.post("/Order",async(req,res)=>{
  const {useremail,username,foodname,quantity,totalprice,foodimage} = req.body

  const data={
      Useremail:useremail,
      Username:username,
      Orderdetails:[{ Foodname: foodname, Quantity: quantity, Price: totalprice,Foodimage:foodimage }],
  }

  try{
     
      const check = await collectionorder.findOne({ Useremail:useremail });

       if(check){
           check.Orderdetails.push({Foodname:foodname,Quantity:quantity,Price:totalprice,Foodimage:foodimage})
           await check.save();
           
       }
       else{
      await collectionorder.insertMany([data])
      
       }
res.json("success")
  }
  catch(e){
      res.json("fail")
  }

})
server.post("/favorite",async(req,res) =>{
    const{useremail} = req.body

    try{
       
        const check = await collectionorder.findOne({ Useremail:useremail });

         if(check){
             res.json(check.Orderdetails)
            
         }
        

    }
    catch(e){
        res.json("fail")
    }

})
const multer = require("multer");
const { update } = require("tar");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/dataimages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });



server.post("/up", upload.single("image"), async (req, res) => {
  
    const imageName = req.file.filename;
    const {foodname} =req.body;
    const{price} = req.body;
    const{rating} = req.body;
  const{quotes} = req.body;
    try {
      await collectionfood.create({ image: imageName ,Foodname:foodname ,Price:price ,Rating:rating,Quotes:quotes});
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });

  server.get("/getimage", async (req, res) => {
    try {
      collectionfood.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      res.json({ status: error });
    }
  });
  
  server.post("/uploadcart",async(req,res)=>{
    const {useremailcart,usernamecart,foodnamecart,foodimagecart,pricecart,ratingcart} = req.body

    const data={
        Useremail:useremailcart,
        Username:usernamecart,
        Cartdetails:[{ Foodnamecart: foodnamecart,Foodimagecart:foodimagecart ,Pricecart:pricecart,Ratingcart:ratingcart}],
    }

    try{
       
        const checkcart = await collectioncart.findOne({ Useremail:useremailcart });

         if(checkcart){
             checkcart.Cartdetails.push({ Foodnamecart: foodnamecart,Foodimagecart:foodimagecart ,Pricecart:pricecart,Ratingcart:ratingcart})
             await checkcart.save();
             res.json("sucess")
         }
         else{
        await collectioncart.insertMany([data])
        res.json("sucess")
         }

    }
    catch(e){
        res.json("fail")
    }

})
  
server.post("/getfav",async(req,res)=>{
    const {useremailcart,foodnamecart}=req.body

    try{
        
        const checkfav=await collectioncart.findOne({Useremail:useremailcart,'Cartdetails.Foodnamecart':foodnamecart}) 
        
        

        if(checkfav){
            res.json("include")
           
        }
        
       
        else {
            res.json("notinclude")
        }

    }
    catch(e){
        res.json("fail")
    }
   

})

server.post("/getcart",async(req,res) =>{
    const {useremail} = req.body;
    try{
        const checkcart = await collectioncart.findOne({ Useremail:useremail });

         if(checkcart){
             res.json(checkcart.Cartdetails)
            
         }
        

    }
    catch(e){
        res.json("fail")
    }
    
})
server.delete("/deleteCartItem", async (req, res) => {
    try {
      const { useremail, foodnamedelcart } = req.body;
  
      const updatedCart = await collectioncart.findOneAndUpdate(
        { Useremail: useremail },
        { $pull: { Cartdetails: { Foodnamecart: foodnamedelcart } } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found.' });
      }
  
      return res.status(200).json({ message: 'Item removed from cart.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  
  server.post("/postnotify",async(req,res) =>{
const{useremail,username,notify} = req.body
    const data ={
        Useremail:useremail,
        Username:username,
        Notificationdata:[
            {
                Notification:notify
            },
        ],
    }
      try{
         
          const updatednotify = await collectionnotify.findOne({Useremail:useremail});

          if(updatednotify){
              updatednotify.Notificationdata.push({
                  Notification:notify
              });
              await updatednotify.save();
              res.json("success")
          }else{
          
            await collectionnotify.insertMany([data])
        res.json("success")
          }
          
      }catch(e){
          res.json(e)
      }
  })
  server.post("/getnot", async (req, res) => {
    const  {useremail}  = req.body
  
    try {
      const getnotify = await collectionnotify.findOne({ Useremail: useremail });
      if (getnotify) {
        res.json(getnotify.Notificationdata);
        await getnotify.save();
        
      } 
     
    else {
        res.json("not include");
      }
    } catch (e) {
      res.json("fail")
    }
  });
  server.post("/addaddress", async (req, res) => {
    const { username, useremail, door, village, district, pin } = req.body;
    const data = {
      Useremail: useremail,
      Username: username,
      Doorno: door,
      Village: village,
      District: district,
      Pincode: pin
    };
  
    try {
      await collectionaddress.insertMany([data]);
      res.json("success");
    } catch (error) {
      res.json(error);
    }
  });
  
  
  server.put("/putaddress", async (req, res) => {
    const { username, useremail, door, village, district, pin } = req.body;
    const filter = { Useremail: useremail }; 
    const update = {
      $set: {
        Username: username,
        Doorno: door,
        Village: village,
        District: district,
        Pincode: pin,
      },
    };
  
    try {
      const existingDocument = await collectionaddress.findOne(filter);
  
      if (existingDocument) {
        const result = await collectionaddress.updateMany(filter, update);
        res.json("success");
         
      } else {
        res.json("fail");
      }
    } catch (error) {
      res.json(error);
    }
  });
  
  server.post("/getaddress",async(req,res) =>{
    const {useremail} = req.body
 
    try{
      const check = await collectionaddress.find({Useremail:useremail});
      if(check){
        res.json(check);
      }
    }catch(e){
      console.log(e);
    }
  })

  server.put("/putuserdetails", async (req, res) => {
    const { useremail,mnchange,pchange,cpchange } = req.body;
    const filter = { email: useremail }; 
    const update = {
      $set: {
        mobileno:mnchange,
        password:pchange,
        cpassword:cpchange
      },
    };
  
    try {
      const existingDocument = await collection.findOne(filter);
  
      if (existingDocument) {
        const result = await collection.updateMany(filter, update);
        res.json("success");
         
      } else {
        res.json("fail");
      }
    } catch (error) {
      res.json(error);
    }
  });

  server.post("/getuserdetails",async(req,res) =>{
    const {useremail} = req.body
 
    try{
      const check = await collection.find({email:useremail});
      if(check){
        res.json(check);
      }
    }catch(e){
      console.log(e);
    }
  })

  server.put("/forgotpassword", async (req, res) => {
    const { mnchange,pchange,cpchange } = req.body;
    const filter = { mobileno: mnchange }; 
    const update = {
      $set: {
        password:pchange,
        cpassword:cpchange
      },
    };
  
    try {
      const existingDocument = await collection.findOne(filter);
  
      if (existingDocument) {
         await collection.updateMany(filter, update);
        res.json(existingDocument.email);
         
      } else {
        res.json("fail");
      }
    } catch (error) {
      res.json(error);
    }
  });
server.listen(5000,()=>{
    console.log("port connected");
})

