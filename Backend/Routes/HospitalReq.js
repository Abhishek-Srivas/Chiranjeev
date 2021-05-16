//import all required packages here
const express = require("express");
const router = express.Router();
const HospitalRequest = require("../Controllers/HospitalReq");

router.post("/:id/Request/Bed",HospitalRequest.RequestBed);
router.post("/:id/Request/Plasma",HospitalRequest.RequestPlasma);
router.get("/:id/Request",HospitalRequest.getAllRequests);
router.delete("/:id/BedDelete",HospitalRequest.DeleteBedRequest);
router.delete("/:id/PlasmaDelete",HospitalRequest.DeletePlasmaRequest);
module.exports = router;