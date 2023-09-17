const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    usertype: {
        type: String,
        required: true
    },
    contact: {
        name: {
            type: String,
            
        },
        phonenumber: {
            type: Number,
            
        }
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    properties: [{
        type:Schema.Types.ObjectId,
        ref: 'property'
    }]
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema)