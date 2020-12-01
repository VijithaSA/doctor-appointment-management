const express      = require('express')
const router       = express.Router();
const appointment  = require('../model/appointment');
const slots        = require('../model/slots');

router.post('/bookAppointment', async function(req,res){
    try{
        let reqData = req.body;
        let appointmentExists = await appointment.findOne({slotId:reqData.slotId}).lean();
        if(appointmentExists){
            res.json({status:false, msg:'This time slot was already scheduled'});
        }else{
            let createAppointment = await appointment.create(reqData);
            if(createAppointment){
                let updateSlot = await slots.update({_id:reqData.slotId},{$set:{status:'scheduled'}});
                res.json({status:true, msg:'Created Successfully'});
            }else{
                res.json({status:false, msg:'Unable to Add appointment'});
            }
        }
    }catch(e){
        console.log('erron while add appointment',e);
        res.json({status:false, msg:'Unable to add'})
    }
});

router.get('/getAppointments', async function(req,res){
    try{
        let getAppointments = await appointment.find({}).populate('slotId');
        if(getAppointments && getAppointments.length != 0){
            res.json({status:true, data:getAppointments});
        }else{
            res.json({status:false, msg:'No Data Found'});
        }
    }catch(e){
        console.log('erron while getting appointment',e);
        res.json({status:false,msg:'Unable to get appointment list'})
    }
});


module.exports = router;