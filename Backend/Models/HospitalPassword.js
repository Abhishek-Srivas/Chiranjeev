var mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    Email : {
        type: String,
        require: true
    },
    Otp : {
        type: String,
        require: true,
    },
    createdAt: { type: Date, expires: "1m", default: Date.now },
});
// OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds:180 });

module.exports = mongoose.model("ChangePasswordOtp", OtpSchema);