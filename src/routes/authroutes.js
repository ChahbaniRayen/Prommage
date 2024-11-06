const express = require('express'); 
const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const user = require('../models/user');
const router = express.Router();  
const bcrypt = require('bcrypt'); 
const authMiddleware = require('../../middelweare/authMiddleware'); 
console.log("Type de authMiddleware:", typeof authMiddleware); // Doit afficher "function" dans la console



router.get('/profil', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenue dans votre profil!', user: req.user });
});


router.post('/register',async (req,res)=>{ 
    const { username, email, password } = req.body;  
    try { 
        const user = new User({username , email,password}); 
        await user.save();  
        res.status(201).json({message :"user successfully registered"});
    
    } catch (error){ 
        res.status(400).json({message:"error creating user"}); 
    }

})   





router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Mot de passe incorrect" });
        }
        const token = jwt.sign(
            { _id: user._id, email: user.email },  
            process.env.JWT_SECRET,               
            { expiresIn: '1h' }                   
        );
        res.status(200).json({ message: "Connexion réussie", user,token });
    } catch (error) {
        console.error("Erreur de serveur :", error); 
        res.status(500).json({ error: "Erreur serveur", details: error.message }); 
    }
});



module.exports = router;
