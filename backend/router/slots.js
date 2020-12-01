const express      = require('express')
const router       = express.Router();
const slots      = require('../model/slots');

router.post('/addSlots', async function(req,res){
    try{
        let reqData = req.body;
        let reqDate = new Date(reqData.date);
        let slotExists = await slots.findOne({fromTime:reqData.fromTime, 
                                            toTime:reqData.toTime, 
                                            date:{$gte:new Date(reqDate.setHours(00,00,00)) ,     
                                                $lt :new Date(reqDate.setHours(23,59,59))}
                                            }).lean();
        if(slotExists){
            res.json({status:false, msg:'Time Slot was already present'});
        }else{
            let createSlot = await slots.create(reqData);
            if(createSlot){
                res.json({status:true, msg:'Created Successfully'});
            }else{
                res.json({status:false, msg:'Unable to Add slots'});
            }
        }
    }catch(e){
        console.log('erron while add company',e);
        res.json({status:false, msg:'Unable to add'})
    }
});

router.post('/getSlot', async function(req,res){
    try{
        let reqData = req.body;
        let givenDate = new Date(reqData.date);
        let getSlots = await slots.find({status:'unscheduled',
                                         date:{$gte:new Date(givenDate.setHours(00,00,00)) ,     
                                               $lt :new Date(givenDate.setHours(23,59,59))} 
                                        });
        if(getSlots && getSlots.length != 0){
            res.json({status:true, data:getSlots});
        }else{
            res.json({status:false, msg:'No Data Found'});
        }
    }catch(e){
        console.log('erron while getting Slots',e);
        res.json({status:false,msg:'Unable to get slot list'})
    }
});

router.post('/getSlotByDate', async function(req,res){
    try{
        let reqData = req.body;
        let dateFind = new Date(reqData.date)
        let getSlots = await slots.find({date:{$gte:new Date(dateFind.setHours(00,00,00)) ,     
                                                $lt :new Date(dateFind.setHours(23,59,59)) } });
        if(getSlots && getSlots.length != 0){
            res.json({status:true, data:getSlots});
        }else{
            res.json({status:false, msg:'No Data Found'});
        }
    }catch(e){
        console.log('erron while getting Slots',e);
        res.json({status:false,msg:'Unable to get slot list'})
    }
})

module.exports = router;