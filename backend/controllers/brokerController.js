const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validator = require('validator')
require('dotenv').config()
//import models
const UserModel = require('../models/userModel');
const propertyModel = require('../models/propertyModel')

//sing up user
const signUpUser = async(usertype, email, password) => {

    //validation 
    if (!usertype) {
       throw Error('usertype field is required' )
    }
    if (!email) {
       throw Error('email field is required' )
    }
    if (!password) {
       throw Error('password field is required')
    }
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong try ( minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)')
    }
    
    const existingUserCheck = await UserModel.findOne({ email: email });
    if (existingUserCheck) {
        throw Error('User already exists' );
    }

    const hashPass = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
        usertype: usertype,
        email: email,
        password: hashPass

    });
    //creating the jwt token for authentiation
    
    

    return result;
}
//sign up function 
const signUp = async (req, res) => {
    const { usertype, email, password } = req.body;
    try {
        const user = await signUpUser(usertype, email, password)
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({type:user.usertype,  user: user.email, token: token });
    }
    catch (error) {
        console.log("error")
        return res.status(500).json({ error: error.message })
        
    }

}
//login function 
const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({error : 'email field is required' })
     }
     if (!password) {
        return res.status(400).json({error: 'password field is required'})}
    
    try {
        //check if user exists
        const existingUserCheck = await UserModel.findOne({ email: email });
        if (!existingUserCheck) {
            return res.status(400).json({error:'Incorrect email'})     
       }
        const matchPasswordStatus = await bcrypt.compare(password, existingUserCheck.password)
        console.log(matchPasswordStatus)
        if (!matchPasswordStatus) {
            return res.status(400).json({error:'Incorrect password' })
        }

        //creating the jwt token for authentiation
        const token = jwt.sign({ email: existingUserCheck.email, id: existingUserCheck._id }, process.env.SECRET_KEY);

        return res.status(200).json({ type:existingUserCheck.usertype, email:existingUserCheck.email, token: token });

    }
    catch (error) {
        
        return res.status(500).json({ error: error.message })
    }
}


const getUserHompage = async(req,res) => {
    properties = await propertyModel.find({})
    res.status(200).json(properties)
    
}
const updateUserModel= async(req,res) =>{
    const {id} = req.params;

}


module.exports = {
    
    signUp,
    logIn,
    getUserHompage,
    updateUserModel
}