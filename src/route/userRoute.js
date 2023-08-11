const express = require("express");
const router = express.Router();
const useController =require("../controller/userController")
const { check } = require('express-validator');
const multer = require("multer");


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Destination folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // File naming (timestamp + original name)
    },
  });
  
  var upload = multer({Storage: Storage });

  //upload.single("profilePic"),

router.post("/add",[check('email').not().isEmpty().isEmail(),check('password').not().isEmpty().isLength({min: 6})],useController.create)
router.get("/list",useController.findAll)
router.get("/list/:id",useController.findOne)
router.delete("/delete/:id",useController.deleteOne)
router.delete("/delete",useController.deleteAll)
router.post("/login",useController.login)
router.put("/update/:id",useController.update)

module.exports =router;