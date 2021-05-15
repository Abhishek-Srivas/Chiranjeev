var mongoose = require("mongoose");

const PlasmaDonation = new mongoose.Schema({
    DonorName:{
        type : String,
        require : true,
    },
    Number:{
        type : String,
        require : true
    },
    Age: {
        type: String,
        require: true,
    },
    Gender: {
        type : String,
        require : true,
    },
    City:{
        type : String,
        require : true
    },
    BloodGroup:{
        type : String,
        require : true
    }
    ,
    State:{
        type : String,
        require : true
    },
    Date:{
        type : String,
        require : true
    } 
});

module.exports = mongoose.model("PlasmaDonation",PlasmaDonation);