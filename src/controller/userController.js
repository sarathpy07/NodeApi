const User = require("../model/usermodel.js")
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');
const multer = require("multer");

// const addUser = new USER({
//     name :"sarath",
//     email:"sarath@gmail.com",
//     age: 20,
//     phone: 9897683566

// });
// await addUser.save();

// Create and Save a new Tutorial

//multer config

/* const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Destination folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // File naming (timestamp + original name)
  },
});

var upload = multer({ storage :Storage }).single("file"); */

exports.create = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const query = { email: req.body.email };
  const isexist = await userModel.findOne(query);
  console.log("isexist",isexist)
  if(isexist){
    return res.send({message :'User Already existing'});
  }
  const hash_password = await bcrypt.hash(req.body.password, 10);
    try{
      // const {username,email,password,age,phone } = req.body;
      // const addUser = await new userModel({ username,email, password, age, phone });
      const addUser = await new User({
        username : req.body.username,
        email  : req.body.email,
        password : hash_password,
        age : req.body.age,
        phone : req.body.phone,
       // profilePictureURL :req.file.path
      });
      /* if (req.file) {
        console.log("req",req.file)
        addUser.profilePictureURL = req.file.filename;
      } */
      addUser.save();
       res.status(200).send({
        message: "User was created successfully!"
       })
    }catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          "error User was not created",
      });
    }
    
    // addUser.username = req.body.username,
    // addUser.email = req.body.email,
    // addUser.password = hash_password,
    // addUser.age = req.body.age,
    // addUser.phone = req.body.phone
};

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  //find user exist or not
  await User.findOne({ email })
  .then(user => {
    console.log("user",user);
      //if user not exist than return status 400
      if (!user) return res.status(400).json({ msg: "User not exist" })

      //if user exist than compare password
      //password comes from the user
      //user.password comes from the database
       bcrypt.compare(password, user.password, (err, data) => {
          //if error than throw error
          if (err) throw err

          //if both match than you can do anything
          if (data) {
              return res.status(200).json({ msg: "Login success" })
          } else {
              return res.status(401).json({ msg: "Invalid credencial" })
          }

      })

  })
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
       await User.find({}).then((err, result) => {
        console.log("result")
        if (err) {
          res.send(err)
        }
        res.send(result)
      })
  
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await User.findById(id).then((err, result) => {
        console.log("result",result)
        if (err) {
          res.send(err)
        }
        res.send(result)
      })
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const hash_password = await bcrypt.hash(req.body.password, 10);
  const filter = { _id: id };
  const update = { 
    username : req.body.username,
    password : hash_password,
    email : req.body.email,
    age : req.body.age,
    phone : req.body.phone
  };
  const option = {new: true}
  var doc = await User.findOneAndUpdate(filter,update,option).then((err,data)=>{
    console.log("data",data)
    if(data){
      res.send({message: "User Updated successfully"});
    }else{
      res.send(err)
    }
  });
};

// Delete a Tutorial with the specified id in the request
exports.deleteOne = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndRemove(id).then((data) => {
        console.log("data",data)
        if (!data) {
            res.status(404).send({
                message: `Cannot delete user  id=${id}. Maybe User was not found!`
           });
        }else{
            res.send({
                message: "User was deleted successfully!"
              })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
    });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  await User.deleteMany({}).then((data) =>{
    if (!data) {
      res.status(404).send({
          message: `Cannot delete user Maybe User table is empty!`
     });
    }else{
      res.send({
          message: "All User was deleted successfully!"
        })
    }
  });
};