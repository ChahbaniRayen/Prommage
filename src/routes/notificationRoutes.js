const express = require('express'); 
const Notification = require('../models/Notification'); 
const authenticate= require('../../middelwearer/authentication'); 
const router = express.Router(); 

router.get('/notifications',authenticate,async(req,res)=>{ 
    try{ 
        const notifications= await Notification.findById({user:req.user._id,read:false} ); 
        res.statut(200).json(notifications); 
    }catch(err){ 
        res.status(500).json({error:"Error fetching notifications"});
    }
}) 



router.put('/notifications',authenticate,async(req,res)=>{ 
    try { 
        const notifications= await Notification.findByIdAndUpdate(
          
             req.params.id, 
             {read:true}, 
             {new:true}
        );
        if (!notification) return res.status(404).json({ error: 'Notification non trouvée' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la notification' });
    }
}) 
module.exports = router;
