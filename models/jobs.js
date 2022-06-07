const mongoose = require('mongoose')

const Jobschema = new mongoose.Schema({
    company:{
        required:[true,'Please provide the company name'],
        type:String,
        maxlength:50
    },
    position:{
        required:[true,'Please provide the position'],
        type:String,
        maxlength:100
    },
    status:{
        type:String,
        enum:['declined','pending','interview'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job',Jobschema)