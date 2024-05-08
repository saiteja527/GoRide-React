const User = require("../models/user-model");
const Book = require("../models/users-other")
const Driver = require("../models/drivers");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY
const home = async (req, res) => {
    try {
        res.status(200).json({ message: "WELCOME ROUTER" });
    } catch (err) {
        console.log(error);
    }
};

const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, password, email, phone } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const userCreated = await User.create({ username, password, email, phone });

        res.status(201).json({
            msg: "registration successful",
            userCreated
            // token: await userCreated.generateToken(),
            // userId: userCreated._id.toString(),
        });
    } catch (error) {
        //res.status(500).send("internal server error");
        next(error);
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //const user = await userExist.comparePassword(password);
        if (userExist.password !== password) {
            return res.status(400).json({ message: "Invalid password" })
        }


        const token = { "userId": userExist._id, "username": userExist.username, "email": userExist.email, "phone": userExist.phone }
        return res.status(200).json({ message: "Successfully logged in", token })


    } catch (error) {
        res.status(500).json("internal server error");
    }
}
const book = async (req, res, next) => {
    try {
        //console.log(req.body);
        const { username, phone, clientId, ride, date, source, destination } = req.body;
        const rideCreated = await Book.create({ username, phone, clientId, ride, date, source, destination });
        res.status(201).json({
            msg: "booked successfully",
            bookId: rideCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
}

const bookDetails = async (req, res, next) => {
    try {
        const details = await Book.find().sort({ date: "asc" });
        //if(ride === false){
        //   return res.status(400).json({msg:"Ride is not booked"});
        //}

        console.log(details);
        res.status(201).json({ msg: "Booking details", details });
    } catch (error) {
        //res.status(500).send("internal server error");
        next(error);
    }
}

const driver = async (req, res, next) => {
    try {
        //console.log(req.body);
        const { name, license, model, phone, age } = req.body;
        //if(ride === false){
        //   return res.status(400).json({msg:"Ride is not booked"});
        //}
        const driverCreated = await Driver.create({ name, license, model, phone, age });
        res.status(201).json({
            msg: "Driver details registered successfully",
            driverId: driverCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
}

const acceptRide = async (req, res, next) => {
    try {

        const { id, driverName, driverPhone } = req.params;
        console.log(id);

        const updatedRideStatus = await Book.findByIdAndUpdate(id, { ride: true, driverName: driverName, driverPhone: driverPhone })
        return res.status(201).json({ message: "ride accepted successfully", updatedRideStatus })

    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
}

const userTripsHistory = async (req, res, next) => {
    try {

        const { clientId } = req.params;
        const history = await Book.find({ clientId });
        return res.status(201).json({ msg: "history retrieved succesfully", history })
        console.log(history)

    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
}

module.exports = { home, register, login, book, bookDetails, driver, acceptRide, userTripsHistory }