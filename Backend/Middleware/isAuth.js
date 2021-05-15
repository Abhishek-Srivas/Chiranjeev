const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const HospitalAuth = require('../Models/HospitalAuth');
const ACCESS = process.env.SUPERSECRET;

module.exports = (req,res,next)=>{

    const {authorization}=req.headers
    console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    
    const token=authorization.replace("Bearer ","");

    console.log(authorization);

    jwt.verify(token,ACCESS,(err,payload)=>{
        if(err){
            return res.status(401).json(err)
        }
        //payload contains data which is stored in token
        const {_id,Email,HospitalName}=payload;
        HospitalAuth.findById(_id)
        .then(result =>{
            req.HospitalData=result;
            next();
        })
        .catch(err =>{
            return res.json(err);
        });
        
    })
    
};