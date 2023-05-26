const express=require('express');
const {getkey} =require('../controllers/paymentController');
const {checkout}=require('../controllers/paymentController');
const {paymentverification}=require('../controllers/paymentController');

const router=require('express').Router();
router.post('/checkout',checkout);
router.post('/paymentverification',paymentverification);

router.post('/getkey',getkey);
module.exports=router;