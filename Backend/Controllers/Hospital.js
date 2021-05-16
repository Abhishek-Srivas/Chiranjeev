const AsyncHandler = require("express-async-handler");

const HospitalList = require("../Models/HospitalAuth");

exports.AllHospital = AsyncHandler ( async (req,res,next)=>{
    const List = await HospitalList.find({
        $and : [
            {Isverified : "true"},
            {$or : [
                {Bedavailability : "Beds available"},
                {Plasmaavailability : "Plasma available"},
                {Vaccineavailability : "Vaccines available"},
                {Oxygenavailability : "Oxygen available"},
                {Remdesiviravailability : "Remdesivirs available"}
            ]}
        ]
    })
    .exec();

    return res.status(200).json({List : List});
});

exports.HospitalByCity = AsyncHandler ( async ( req,res,next)=>{
    const City = req.body.city;
    console.log(City);
    const List = await HospitalList.find({
        $and : [
            {Isverified : "true"},
            {City : { $regex: City,$options: 'i'}},
            {$or : [
                {Bedavailability : "Beds available"},
                {Plasmaavailability : "Plasma available"},
                {Vaccineavailability : "Vaccines available"},
                {Oxygenavailability : "Oxygen available"},
                {Remdesiviravailability : "Remdesivirs available"}
            ]}
        ]
    })
    .exec();

    res.status(200).json({List : List});
});


