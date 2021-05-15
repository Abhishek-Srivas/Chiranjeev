var mongoose = require("mongoose");

const bedDonation = new mongoose.Schema({
    DonorName:{
        type : String,
        require : true,
    },
    Number:{
        type : String,
        require : true
    },
    NoOfBed: {
        type : String,
        require : true,
    },
    City:{
        type : String,
        require : true,
    },
    State :{
        type : String,
        require : true,
    }
});

module.exports = mongoose.model("BedDonation",bedDonation);