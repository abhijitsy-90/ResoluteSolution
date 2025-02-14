const logger = require('./logger');
const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const {generateToken}=require('../middlewares/authenticate');
const Joi=require('joi');

const UserBlogs = Joi.object({
    email: Joi.string().min(3).max(40).required(),
    password:Joi.string().required()
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.Registration=async(req,res)=>{
    const {email,password}=req.body;
    const { error } = UserBlogs.validate({email,password});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try{
   const hashedPassword=await bcrypt.hash(password,12);
   
   const existedUser=userModel.find((item)=>item.email==email);
   if(existedUser){
    return res.status(400).json({error:"This user already existed in our data base"});
   }
   let userID= getRandomInt(50,1000);
   userModel.push({email,password:hashedPassword,Id:userID});
   return res.status(200).json({message:"Registration successfully"});

    }catch(error){
        logger.error({
            functionName: 'Registration',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: error.message,
          }, "Error occurred in Registration function");
          return res.status(500).send({ status: false, message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = UserBlogs.validate({email,password});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

        const ExistedData=userModel.find((item)=>item?.email==email);
        if(!ExistedData){
            return res.status(400).json({error:"Invalid Email ID"});
        }
    
        const checkpassword = await bcrypt.compare(password, ExistedData.password)
        if (!checkpassword) {
            return res.status(401).send({ status: false, message: "Password is incorrect" })
        } else {
            const token=await generateToken(ExistedData?.email,ExistedData?.Id);
             
            return res.status(200).send({ status: true, message: "User login successfully",token})
        }
    } catch (err) {
        logger.error({
            functionName: 'login',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
          }, "Error occurred in login function");
        return res.status(500).send({ status: false, message: err.message })
    }
}