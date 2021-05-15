var mongoose = require("mongoose");

const bedRequest = new mongoose.Schema({
    HospitalDetails : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalAuth",
    },
    NumberOfBed :{
        type : String,
        require : false
    }
});

module.exports = mongoose.model("bedRequest",bedRequest);