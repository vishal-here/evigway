const express= require('express')
const router= express.Router() ;

const obj =require('../controllers/events');
const check_auth = require('../middleware/check_auth');


router.post('/create',check_auth,obj.createEvent)
router.get('/get',obj.readEvent)
router.patch('/update/:eid',check_auth,obj.updateEvent)
router.patch('/cancel/:eid',check_auth,obj.cancelEvent)
router.patch('/join/:eid',check_auth,obj.joinEvent)

module.exports= router ;