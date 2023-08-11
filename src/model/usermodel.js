const mongoose = require("mongoose");

var userSehema = new mongoose.Schema({
username : {type :String, required: [true, 'username is required']},
email: {type :String, required: [true, 'email is required']},
password: {type: String, required:[true,'password is required']},
age: {type :Number},
phone:{type : Number,required: [true, 'phone is required']},
//profilePictureURL: { type: String },
created_date: {
    type: Date,
    default: Date.now
}
});

const User = mongoose.model('USER', userSehema);

//module.exports = mongoose.model('USER', userSehema);
module.exports = User;