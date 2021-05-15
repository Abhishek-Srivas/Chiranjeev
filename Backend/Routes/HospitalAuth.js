//import all required packages here
const express = require("express");
const router = express.Router();

//middleware for protected routes
const isAuth=require('../Middleware/isAuth');

//importing controllers 
const HospitalAuthController = require("../Controllers/HospitalAuth");

//route for authentication
router.post("/Hospital/Registration",HospitalAuthController.registration);
router.patch("/Hospital/Details/:id",HospitalAuthController.extradetails);
router.post("/Hospital/VerifyOtp",HospitalAuthController.otpverification);
router.post("/Hospital/ResendOtp",HospitalAuthController.resendotp);
router.post("/Hospital/Login",HospitalAuthController.HospitalLogin);
router.get("/Hospital/:id",HospitalAuthController.getDetails);

module.exports = router;