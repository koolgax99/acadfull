const mongoose = require('mongoose');
const contact = new mongoose.Schema({
    name : String,
    email : String,
    subject : String,
    message : String
})
module.exports = mongoose.model("contact", contact);