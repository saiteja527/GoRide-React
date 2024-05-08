const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const bookingsSchema = new mongoose.Schema({
    booking:{
        source:String,
        destination:String,
        Date:String
    }
});


const Bookings= new mongoose.model("Booking", bookingsSchema);
module.exports = Bookings;