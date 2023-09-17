const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validator = require('validator')
require('dotenv').config()
//import models
const UserModel = require('../models/userModel');
const propertyModel = require('../models/propertyModel');



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

    return result;
}
//sign up function 
const signUp = async (req, res) => {
    const { usertype, email, password } = req.body;
    try {
        const user = await signUpUser(usertype, email, password)
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({type:user.usertype,  email: user.email, token: token });
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
//search result
const specificProperties = async(req,res) => {
    const query = req.params.query;
    const Location = query[0].toUpperCase()+query.slice(1);
    const properties = await propertyModel.find({location: Location})
    res.status(200).json(properties);
   
}

const getUserHompage = async(req,res) => {
    properties = await propertyModel.find({})
    res.status(200).json(properties)
    
}
const Contactdetails = async(req,res) => {
    const {contact, userEmail} = req.body ;
    console.log(contact)
    const updatedUser = await UserModel.findOneAndUpdate(
        {email: userEmail},
        {$set: {'contact.name': contact.name,
        'contact.phonenumber': contact.PhoneNumber,}},
        {new:true}
    )
    
    if(!updatedUser){
        res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({message: 'Contact details added'})

}
const updateUserModel= async(req,res) =>{
    console.log(req.body)
    const {chosenProperties, userEmail} = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
    {email: userEmail},
    {$set: {properties: chosenProperties}},
    { new: true })
    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        }
    
    
    console.log('Updated user:', updatedUser);
    res.status(200).json({ message: 'Properties added successfully' });
}

const accessUserInfo = async(req,res) => {
    try{
        const properties = await propertyModel.find({})
    
        const updatedProperties=[]
        for (const property of properties) {
            const users = await UserModel.find({ properties: property._id });
            const updatedProp = await propertyModel.findOneAndUpdate(
                { _id: property._id },
                { $set: { Interested: users.map(user => ({
                    email: user.email,
                    contact: user.contact,
                })) } },
                { new: true }
            );
             console.log(updatedProp)   
            if (!updatedProp) {
                return res.status(404).json({ message: 'Property not found' });
            }

            updatedProperties.push(updatedProp);
        }

        console.log('Updated properties:', updatedProperties);
        res.status(200).json({ message: 'Properties updated successfully', updatedProperties });
    }catch (error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    signUp,
    logIn,
    getUserHompage,
    updateUserModel,
    accessUserInfo,
    specificProperties,
    Contactdetails
}