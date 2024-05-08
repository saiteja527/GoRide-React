const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const driver = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    license:{
        type:String,
        require: true,
    },
    model:{
        type:String,
        require: true,
    },
    phone:{
        type:String,
        require: true,
    },
    age:{
        type:String,
        default: false,
    },
});


const Driver= new mongoose.model("Driver", driver);
module.exports = Driver;