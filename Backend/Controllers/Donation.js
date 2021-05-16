const asyncHandler = require("express-async-handler");

const DonationBed = require("../Models/BedDonation");
const DoantionPlasma = require("../Models/PlasmaDonation");
const PlasmaReqByHospital = require("../Models/PlasmaRequest");
const BedReqByHospital = require("../Models/BedRequests");

exports.BedDonation = asyncHandler(async (req, res, next) => {
  const { DonorName, Number, City, State, NoOfBed } = req.body;
  console.log(req.body);
  if (!DonorName || !Number || !City || !State || !NoOfBed) {
    return res
      .status(500)
      .json({ Error: "Please Fill all the require fields" });
  }
  const DonorDetails = new DonationBed(req.body);
  await DonorDetails.save();
  return res.status(200).json({ DonorDetails: DonorDetails });
});

exports.PlasmaDonation = asyncHandler(async (req, res, next) => {
  const { DonorName, Number, Age, BloodGroup, Gender, City, Date } = req.body;
  console.log(req.body);
  if (
    !DonorName ||
    !Number ||
    !Age ||
    !City ||
    !Gender ||
    !BloodGroup ||
    !Date
  ) {
    return res
      .status(500)
      .json({ Error: "Please Fill all the require fields" });
  }
  const DonorDetails = new DoantionPlasma(req.body);
  await DonorDetails.save();
  return res.status(200).json({ DonorDetails: DonorDetails });
});

exports.getHospitalBedRequests = asyncHandler(async (req, res, next) => {
  const BedReq = await BedReqByHospital.find()
    .populate(
      "HospitalDetails",
      "HospitalName Contact State City Address InchargeName"
    )
    .exec();
  res.status(200).json({ BedReq: BedReq });
  //const BedRequests = await BedReqByHospital.find();
});
exports.getHospitalPlasmaRequests = asyncHandler(async (req, res, next) => {
  const PlasmaReq = await PlasmaReqByHospital.find()
    .populate(
      "HospitalDetails",
      "HospitalName Contact State City Address InchargeName"
    )
    .exec();
  res.status(200).json({ PlasmaReq: PlasmaReq });
  //const BedRequests = await BedReqByHospital.find();
});

