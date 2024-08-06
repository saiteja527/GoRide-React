const User = require("../models/user-model");
const Book = require("../models/users-other");
const Driver = require("../models/drivers");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

const home = async (req, res) => {
    try {
        res.status(200).json({ message: "WELCOME ROUTER" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const register = async (req, res, next) => {
    try {
        const { username, password, email, phone } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const userCreated = await User.create({ username, password: hashedPassword, email, phone });

        res.status(201).json({
            message: "Registration successful",
            userCreated
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: userExist._id, username: userExist.username, email: userExist.email, phone: userExist.phone }, secret, { expiresIn: '1h' });
        return res.status(200).json({ message: "Successfully logged in", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const book = async (req, res, next) => {
    try {
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
};

const bookDetails = async (req, res, next) => {
    try {
        const details = await Book.find().sort({ date: "asc" });
        res.status(201).json({ msg: "Booking details", details });
    } catch (error) {
        next(error);
    }
};

const driver = async (req, res, next) => {
    try {
        const { name, license, model, phone, age } = req.body;
        const driverCreated = await Driver.create({ name, license, model, phone, age });
        res.status(201).json({
            msg: "Driver details registered successfully",
            driverId: driverCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
};

const acceptRide = async (req, res, next) => {
    try {
        const { id, driverName, driverPhone } = req.params;
        console.log("Ride ID:", id);
        console.log("Driver Name:", driverName);
        console.log("Driver Phone:", driverPhone);

        const updatedRideStatus = await Book.findByIdAndUpdate(id, { ride: true, driverName: driverName, driverPhone: driverPhone }, { new: true });
        if (!updatedRideStatus) {
            return res.status(404).json({ message: "Ride not found" });
        }
        return res.status(200).json({ message: "Ride accepted successfully", updatedRideStatus });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        next(error);
    }
};


const userTripsHistory = async (req, res, next) => {
    try {
        const { clientId } = req.params;
        const history = await Book.find({ clientId });
        return res.status(201).json({ msg: "history retrieved successfully", history });
    } catch (error) {
        res.status(500).send("internal server error");
        next(error);
    }
};

module.exports = { home, register, login, book, bookDetails, driver, acceptRide, userTripsHistory };
