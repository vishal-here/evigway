const express= require('express')
const router= express.Router() ;
const { check } = require("express-validator");

const obj =require('../controllers/auth')


router.post('/login',[check("email").isEmail(),obj.login)
router.post('/signup',obj.signup)
router.get('/getUser/:id',obj.getUser)

module.exports= router ;
