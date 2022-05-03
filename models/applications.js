const mongoose = require('mongoose');
const Application = new mongoose.Schema({
    studentFName :  String,
    studentLName :  String,
    dob          :  String,
    gaurdianName :  String,
    mobileNum    :  String,
    address      :  String,
    pincode      :  String
})

module.exports = mongoose.model("Application",Application);