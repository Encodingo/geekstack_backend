const Razorpay=require('razorpay');
const crypto =require('crypto') ;
require('dotenv').config({path:'./config/config.env'});
const instance= new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


const {Payment}   =require("../models/paymentModel.js");

console.log(process.env.RAZORPAY_API_KEY);


const checkout= async (req,res,next)=>{
  try{
    const options = {
        amount: Number(req.body.price*100),  
        currency: "INR"
      }
      const order= await instance.orders.create(options)
       
       res.status(200).json({
        success:true,
        order
        
       });
       console.log(order);
      }
      catch(ex){
        next(ex);
      }
};

const paymentverification=async (req,res,next)=>{
  try{
    
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

    const body=razorpay_order_id + "|" + razorpay_payment_id;

  
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                  .update(body.toString())
                                  .digest('hex');
                                  
                                  
  const isauthentic= expectedSignature===razorpay_signature;

  console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature);
  console.log(isauthentic);
  if(isauthentic){
    
    const userpayment =new  Payment({
      razorpayOrderId:razorpay_order_id,
      razorpayPaymentId:razorpay_payment_id,
      razorpaySignature:razorpay_signature
    });
    await userpayment.save();
    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  }
  else{
    res.status(400).json({
            success:false,
        })
  }
  // if(isauthentic){

  //   res.redirect('http://localhost:3000/paymentsuccess?reference='.razorpay_payment_id);

  // }
  // else{
  //   res.status(400).json({
  //       success:false,
  //   })
  // }
  
}
catch(ex){
  next(ex);
}
    
    
  

}

const getkey = (req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
}
module.exports={checkout,paymentverification,getkey};
