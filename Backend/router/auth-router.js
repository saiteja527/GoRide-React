const express = require("express");
const router = express.Router();
const authcontrollers = require("../Controllers/auth-controller");

router.route("/").get(authcontrollers.home);
router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/book").post(authcontrollers.book);
router.route("/bookDetails").get(authcontrollers.bookDetails);
router.route("/driver").post(authcontrollers.driver);
router.route("/acceptRide/:id/:driverName/:driverPhone").put(authcontrollers.acceptRide);
router.route("/userTripsHistory/:clientId").get(authcontrollers.userTripsHistory);

module.exports = router;
