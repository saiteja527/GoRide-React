const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bookNow = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    clientId: {
        type: String,
        require: true,
    },
    ride: {
        type: Boolean,
        require: true,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    driverName: {
        type: String,
        default: "",
    },
    driverPhone: {
        type: String,
        default: ""
    }

});
const Book = new mongoose.model("Book", bookNow);
module.exports = Book;