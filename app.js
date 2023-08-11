const express = require("express");
var cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser')
const userRoutes = require("./src/route/userRoute");
const app = express();
const config = require("./src/config/config.js");
const errorMiddleware = require('./src/middleware/errorMiddleware')
const port = 5000;
const path = require("path");
var multer = require('multer');
var upload = multer();

//db connection MongoDb Atlas
const mongoose = require('mongoose');
mongoose.connect(config.Mongo_url_Atlas)
.then(()=>{
  console.log("Db connected successfully");
}).catch((error)=>{
  console.log(error);
})

//db connection MongoDb Local
/* mongoose.connect(config.Mongo_url_Loacal);
var db = mongoose.connection;
if(!db) {
   console.log("Error connecting db")
} else {
   console.log("Db connected successfully")
} */
//body-parser -To receive input values of a form

//middleware
// app.use(bodyParser.urlencoded({ extended: true }));
 //app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cors With out corsOptions - Allow All Cross Origin Resource Sharing
var corsOptions = {
  origin: config.Frontend_Domain,
  optionsSuccessStatus: 200 
}

// If you need to enable corsOptions need to pass corsOptions variable to cors funtion
app.use(cors());

app.use(errorMiddleware);

// app.get('/',(req,res) => {
//     res.send("welcome")
// });

//multer config

/* const Storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, '/uploads'); // Destination folder where files will be stored
   },
   filename: (req, file, cb) => {
     cb(null, Date.now() + '-' + file.originalname); // File naming (timestamp + original name)
   },
 });

var upload = multer({ storage :Storage }).single("file"); */
//router.use(express.static(__dirname+"./uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(upload.single("profilePic")); 

app.use("/",userRoutes);

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${config.PORT}`);
});

module.exports = app;
