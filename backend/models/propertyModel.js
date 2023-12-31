const mongoose = require('mongoose')

const Schema = mongoose.Schema

const propertySchema = new Schema({
    location: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    Price: {
        type:Number,
        required: true
    },
    Rooms:{
        type: String,
        required: true
    },
    Amenities: {
        type: String,
        required: true
    },
    Interested: [
        {
            email: String,
            contact: {
                name: String,
                phonenumber: Number
            }
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('property', propertySchema)