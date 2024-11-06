const express=require('express') ; 
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors'); 
const e = require('express'); 
const authRoutes = require('./routes/authroutes');
const projectRoutes= require('./routes/ProjectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config(); 


const app = express() ; 
const PORT= process.env.PORT || 5000 ; 

app.use(cors()); 
app.use(express.json());  
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes); 
app.use('/api', notificationRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connecté à MongoDB"))
    .catch((error) => console.error("Erreur de connexion MongoDB:", error));
app.get('/',(req,res)=>{ 
    res.send("bienvenu sur Promapge API "); 
}) 

app.listen(PORT,()=>{
    console.log(`serveur en cours d'execution sur le port ${PORT}`);
}) 
