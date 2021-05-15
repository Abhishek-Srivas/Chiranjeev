const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const crypto=require('crypto');
const nodemailer = require("nodemailer")
const nodemailersendgrid = require("nodemailer-sendgrid-transport")
const OtpGenerator = require("otp-generator");
const JWT = require("jsonwebtoken");
//import models
const HospitalAuth =  require("../Models/HospitalAuth");
const HospitalOtp = require("../Models/HospitalOtp");
const ChangePasswordOtp = require("../Models/HospitalPassword");
//regex
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

//sengrid
const transporter = nodemailer.createTransport(nodemailersendgrid({
    auth:{
        api_key: process.env.API_KEY
    }
}))

exports.registration = asyncHandler( async (req,res,next) =>{
    
    const{HospitalName, Email , Password}=req.body;

    //check email validation
    console.log(HospitalName,Email);
    var valid = emailRegex.test(Email);

    if(!valid)
    {
        return res.status(422).json({error: "please enter a valid email"});
    }

    //all details should be mentioned
    if(!Email || !Password || !HospitalName) {
        
        return res.status(422).json({error:"please enter all the fields"});
    }

    //check if hospital is already registered or not
    const RegisteredHospital = await HospitalAuth.findOne({Email:Email});

    if(!RegisteredHospital)
    {
        //hashing password
        const hashedpassword = await bcrypt.hash(Password,12);
        req.body.Password = hashedpassword;

        //creating new instance of hospital & save details
        const NewHospiital = new HospitalAuth(req.body);
        await NewHospiital.save();

        //generate new otp
        let otp = OtpGenerator.generate(4, {
            alphabets: false,
            specialChars: false,
            upperCase: false,
        })
        //save otp
        const optdata = await new HospitalOtp({
            Email : Email,
            Otp : otp
        });
        console.log(otp);

        await optdata.save();

        res.status(200).json({Message : "hospital Successfully Registred , check your Email for Otp"});

        //send otp using email
        return transporter.sendMail({
            from: "sachan.himanshu2001@gmail.com",
            to: Email,
            subject: "signup successful",
            html: `<h1>welcome to Chrianjeev to enjoy our feature please verify your email using this otp : ${otp}</h1>`
        });
    }

    return res.status(500).json("already exist");
});

exports.otpverification = asyncHandler (async (req,res,next)=>{

    const {Otp,Email} = req.body;
    console.log(Otp,Email);

    //check if otp is present or not
    const Otpdata = await HospitalOtp.findOne({Email : Email});  

    //check if hospital already registered
    const RegisteredHospital = await HospitalAuth.findOne({Email:Email});

    if(!RegisteredHospital)
    {
        return res.status(500).json({Error : "No hospital is registered with this email id"});
    }
    if(!Otpdata)
    {
        return res.status(500).json({Error : "Otp is Expired"});
    }

    if(Otpdata.Otp == Otp && RegisteredHospital.Isverified == "false")
    {
        const token=JWT.sign({_id:RegisteredHospital._id},process.env.SUPERSECRET,{expiresIn:'6h'});
        //const {_id,HospitalName,Email}=RegisteredHospital;
        RegisteredHospital.Isverified = "true";
        await RegisteredHospital.save();
        console.log(RegisteredHospital);

        return res.status(200).json({Message : "Otp Successfully Verified" , TOken : token,RegisteredHospital});
    }
    else if(Otpdata.Otp != Otp)
    {
        return res.status(500).json({Error : "Wrong Otp"});
    }
    else
    {
        return res.status(200).json({Messgae : "You are already verified"});
    }
    
});
exports.extradetails = asyncHandler (async (req,res,next)=>{

    const {InchargeName,Address,State,City,Contact,Bedavailability,Plasmaavailability,Vaccineavailability,Oxygenavailability,Remdesiviravailability} = req.body;
    console.log(req.body);
    console.log(req.params.id);

    //check everything is filled
    if (!InchargeName || !Address || !State || !City || !Contact || !Bedavailability || !Plasmaavailability || !Vaccineavailability || !Oxygenavailability || !Remdesiviravailability) {
        return res.status(500).json({ error: "please enter all the fields" });
    }

    //update hospital details
    const UpdatedData = await HospitalAuth.findByIdAndUpdate(req.params.id, req.body);
    //save it
    const data = await UpdatedData.save();
    console.log(data);
    return res.status(200).json({Message : "Details Successfully updated", data});
});

exports.resendotp = asyncHandler ( async (req,res,next)=>{

    const Email = req.body.Email
    //check if hospital is registered or not
    const checkHospital = await HospitalAuth.findOne({Email : Email});
    if(!checkHospital)
    {
        return res.status(500).json({error : "Hospital is not registered with this id"});
    }

    //delete previous otp if present
    const DeletePreOtp = await HospitalOtp.deleteOne({ Email: Email });

    //generate new otp
    let otp = OtpGenerator.generate(4, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
    })
    //save otp
    const optdata = await new HospitalOtp({
        Email : Email,
        Otp : otp
    });
    console.log(otp);

    await optdata.save();

    res.status(200).json({Message : "hospital Successfully Registred , check your Email for Otp"});

    //send new otp using nodemailer
    return transporter.sendMail({
        from: "sachan.himanshu2001@gmail.com",
        to: Email,
        subject: "signup successful",
        html: `<h1>welcome to Chrianjeev to enjoy our feature please verify your email using this otp : ${otp}</h1>`
    });
});

exports.HospitalLogin = asyncHandler ( async (req,res,next)=>{

    const{Email , Password}=req.body;

    if(!Email || !Password) 
    {
        res.status(500).json({Error : "please fill all the fields "});
    }

    //check if hospital is registered or not
    const RegisteredHospital = await HospitalAuth.findOne({Email : Email});

    if(!RegisteredHospital)
    {
        res.status(500).json({Error : "No hospital is registered with this email id"});
    }

    //chekc if password entered is correct or not
    const Passwordmatch = await bcrypt.compare(Password,RegisteredHospital.Password);

    if(!Passwordmatch)
    {
        res.status(500).json({Error : "Password entered is incorrect"});
    }

    //create jwt token
    const token=await JWT.sign({_id:RegisteredHospital._id},process.env.SUPERSECRET,{expiresIn:'6h'});
    console.log(token)

    return res.status(200).json({message:"logged in successfully",token:token,HospitalDetails:RegisteredHospital});
});

exports.ChangePasswordReq = asyncHandler ( async (req,res,next)=>{

    const {Email} = req.body;
    //check if hospital is registered or not
    const FindHospital = await HospitalAuth.findOne({Email : Email});

    if(!FindHospital)
    {
       return res.status(500).json({Error : "No hospital is registered with this email id"});
    }
    //delete previous otp for password change request
    const DeletePreOtp = await ChangePasswordOtp.deleteOne({ Email: Email });

    let otp = OtpGenerator.generate(4, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
    })
    const optdata = await new ChangePasswordOtp({
        Email : Email,
        Otp : otp
    });
    console.log(otp);

    await optdata.save();

    res.status(200).json({Message : "hospital Successfully Registred , check your Email for Otp"});

    return transporter.sendMail({
        from: "sachan.himanshu2001@gmail.com",
        to: Email,
        subject: "signup successful",
        html: `<h1>welcome to Chrianjeev to enjoy our feature please verify your email using this otp : ${otp}</h1>`
    });

});

exports.ChangePassword = asyncHandler ( async (req,res,next)=>{

    const {Email,NewPassword,ConfirmNewPassword} = req.body;

    //check if hospital is registered or not
    const RegisteredHospital = await HospitalAuth.findOne({Email:Email});

    if(!RegisteredHospital)
    {
        return res.status(500).json({Error : "No hospital is registered with this email id"});
    }

    if((NewPassword == ConfirmNewPassword))
    {
        const token=JWT.sign({_id:RegisteredHospital._id},process.env.SUPERSECRET,{expiresIn:'6h'});
       // const {_id,HospitalName,Email}=RegisteredHospital;
       const hashedpassword = await bcrypt.hash(NewPassword,12);
       RegisteredHospital.Password = hashedpassword;
       RegisteredHospital.Isverified = "true";
       await RegisteredHospital.save();

        return res.status(200).json({Message : "Password Successfully Changed" , TOken : token,RegisteredHospital});
    }
    return res.status(500).json({Error : "Password Do not matched"});
});

exports.getDetails  = asyncHandler (async (req,res,next)=>{
    //send hsopital details
    const HospitalData = await HospitalAuth.findById(req.params.id);
    res.status(200).json(HospitalData);
});