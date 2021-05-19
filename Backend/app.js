const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();

//import routes
const HospitalAuth = require("./Routes/HospitalAuth");
const Donation = require("./Routes/Donation");
const HospitalReq = require("./Routes/HospitalReq");
const HospitalSearch = require("./Routes/Hospital");

const PORT = process.env.PORT || 3000 ;

// Express middleware that allows Parsing data
app.use(express.json());

//To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) =>{   
  res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
  res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
  res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
});


//call route middleware
app.use(HospitalAuth);
app.use(Donation);
app.use(HospitalReq);
app.use(HospitalSearch);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT);
    console.log("server started");
  })
  .catch((err) => {
    console.log(err);
  });