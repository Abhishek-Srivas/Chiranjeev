//import all required packages here
const express = require("express");
const router = express.Router();
const SearchRoute = require("../Controllers/Hospital");

router.get("/HospitalsList",SearchRoute.AllHospital);
router.post("/Hospital/City",SearchRoute.HospitalByCity);
module.exports = router;