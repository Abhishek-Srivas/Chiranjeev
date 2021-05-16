//import all required packages here
const express = require("express");
const router = express.Router();
const Donation = require("../Controllers/Donation");

router.post("/Donation/Bed",Donation.BedDonation);
router.post("/Donation/Plasma",Donation.PlasmaDonation);
router.get("/HospitalBedRequests",Donation.getHospitalBedRequests);
router.get("/HospitalPlasmaRequests",Donation.getHospitalPlasmaRequests);
router.get("/BedDonorRequests" , Donation.BedDonorList);
router.get("/PlasmaDonorRequests",Donation.PlasmaDonorList);
router.post("/BedReq/City",Donation.SearchInBedRequests);
router.post("/PlasmaReq/City",Donation.SearchInPlasmaRequests);

module.exports = router;