const AsyncHandler = require("express-async-handler");

const BedRequest = require("../Models/BedRequests");
const PlasmaRequest = require("../Models/PlasmaRequest");
const HospitalList = require("../Models/HospitalAuth");
const AvailableBedDonationList = require("../Models/BedDonation");
const AvailablePlasmaDonationList = require("../Models/PlasmaDonation");
const expressAsyncHandler = require("express-async-handler");


exports.RequestBed = AsyncHandler ( async (req,res,next)=>{
    const {NumberOfBed}=req.body;
    const FindHospital = await HospitalList.findById(req.params.id);
    console.log(req.params.id);
    if(!FindHospital) 
    {
        return res.status(500).json({Error : "No hospital is registered with this email id"});
    }
    const RequestDetails = new BedRequest({
        HospitalDetails : req.params.id,
        NumberOfBed : NumberOfBed
    })
    await RequestDetails.save();
    console.log(RequestDetails);
    return res.status(200).json(RequestDetails);
    // const { HospitalName , Number , Address , NoOfBed , HospitalEmail, City } = req.body;
    // const FindHospital = await HospitalList.findOne({Email : HospitalEmail});
    // if(!FindHospital) 
    // {
    //     return res.status(500).json({Error : "No hospital is registered with this email id"});
    // }

    // const RequestDetails = new BedRequest(req.body);
    // await RequestDetails.save();

});
exports.RequestPlasma = AsyncHandler ( async (req,res,next)=>{
   // const { HospitalName , Number , Address , BloodGroup ,City,HospitalEmail} = req.body;
   const {BloodGroup}=req.body;
   console.log(req.body);
    const FindHospital = await HospitalList.findById(req.params.id);
    console.log(req.params.id);
    if(!FindHospital) 
    {
        return res.status(500).json({Error : "No hospital is registered with this email id"});
    }
    const RequestDetails = new PlasmaRequest({
        HospitalDetails : req.params.id,
        BloodGroup : BloodGroup
    })
    await RequestDetails.save();
    console.log(RequestDetails);
    return res.status(200).json(RequestDetails);
});
exports.DisplayDonorList = AsyncHandler ( async (req,res,next) =>{
    const BedList = await AvailableBedDonationList.find({
        $and : [
            {Isverified : "true"}
        ]
    }).exec();
    const PlasmaList = await AvailablePlasmaDonationList.find({
        $and : [
            {City : req.body.City},
            {State : req.body.State}
        ]
    }).exec();
    return res.status(200).json({BedAvailable : BedList , PlasmaAvailable : PlasmaList});
});
exports.DeleteBedRequest = AsyncHandler ( async (req,res,next)=>{
    await BedRequest.findByIdAndDelete(req.params.id).exec();
    return res.status(200).json({Message : "Deleted"});
});
exports.DeletePlasmaRequest = AsyncHandler ( async (req,res,next)=>{
    await PlasmaRequest.findByIdAndDelete(req.params.id).exec();
    return res.status(200).json({Message : "Deleted"});
});
exports.getAllRequests = AsyncHandler ( async (req,res,next)=>{

    console.log(req.params.id);
    const check = await HospitalList.findOne({_id:req.params.id});
    if(!check)
    {
        return res.status(500).json({Error : "hospital not found"});
    }
    const plasmaRequest = await PlasmaRequest.find({HospitalDetails : req.params.id});
    const bedRequest = await BedRequest.find({HospitalDetails : req.params.id});
    console.log(check,plasmaRequest,bedRequest)
    return res.status(200).json({HospitalName:check.HospitalName ,PlasmaRequest : plasmaRequest, BedRequest : bedRequest  });
});