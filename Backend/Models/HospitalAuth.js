var mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    HospitalName:{
        type : String,
        require : true,
    },
    Email : {
        type: String,
        require: true
    },
    Password : {
        type : String,
        require : true,
        min : 6
    },
    Isverified: {
        type: String,
        default : "false",
        require : false
    },
    InchargeName :
    {
        type: String,
        default : "UpdateInfo",
        require : false
    },
    Address :{
        type : String,
        default : "UpdateInfo",
        require : false,
    },
    State :{
        type : String,
        default : "UpdateInfo",
        require : false
    },
    City :{
        type : String,
        default : "UpdateInfo",
        require : false
    },
    Contact :{
        type : String,
        default : "UpdateInfo",
        require : false,
        max: 10,
        min: 10,
    },
    Bedavailability :
    {
        type : String,
        default : "UpdateInfo",
        require : false
    },
    Plasmaavailability :
    {
        type : String,
        default : "UpdateInfo",
        require : false
    },
    Vaccineavailability :
    {
        type : String,
        default : "UpdateInfo",
        require : false
    },
    Oxygenavailability :
    {
        type : String,
        default : "UpdateInfo",
        require : false
    },
    Remdesiviravailability : 
    {
        type : String,
        default : "UpdateInfo",
        require : false
    }
});
module.exports = mongoose.model("HospitalAuth",HospitalSchema);