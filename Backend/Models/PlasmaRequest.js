var mongoose = require("mongoose");

const PlasmaRequest = new mongoose.Schema({
    HospitalDetails : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalAuth",
    },
    BloodGroup:{
        type : String,
        require : true
    }
});

module.exports = mongoose.model("PlasmaRequest",PlasmaRequest);