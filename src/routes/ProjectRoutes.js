const express = require('express');
const router = express.Router(); 

const Project = require('../models/Project');  
const Notification = require('../models/Notification');
 

const authenticate = require('../../middelweare/authMiddleware');


router.post('/projects',authenticate,async(req,res)=>{
const {name,description}=req.body; 
try { 
    const project = new Project({ 
        name , 
        description,
        createdBy:req.user._id
    }); 
    await project.save();  
    const notification = new Notification({
        user: req.user._id,
        type: 'Projet créé',
        content: `Votre projet "${name}" a été créé avec succès.`,
        projectId: project._id
    });
    await notification.save();
    res.status(201).json(project); 
}catch(error){ 
    res.status(500).json({message:"Error creating project"});
}

}); 

router.get('/projects',authenticate,async(req,res)=>{
    try{ 
        const project = await Project.find({createdBy:req.user._id}); 
        res.status(200).json(project);

    }catch (error){
        res.status(500).json({error:"Erreur lors de la recuparation de projects"});  


    }
})  

router.put('/projects/:id',authenticate,async(req,res)=>{
    const {id}=req.params; 
    const {name,description}=req.body;   
    console.log(name,description);
    try { 


        const updatedProject = await Project.findByIdAndUpdate (
            {_id:id,createdBy:req.user._id}, 
            {name,description}, 
            { new: true }

        ); 
        if (!Project) return res.status(404).json({ error: 'Projet non trouvé' });
        res.status(200).json(updatedProject);


             
    }catch (error) 
    {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du projet' });

    }  

    router.delete('/projects/:id', authenticate, async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project.findOneAndDelete({ _id: id, createdBy: req.user._id });
            if (!project) return res.status(404).json({ error: 'Projet non trouvé' });
            res.status(200).json({ message: 'Projet supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
        }
    });
})  ; 

module.exports = router;
