const express = require("express")
const router = express.Router()
const Application = require("../models/applications")

router.get("/apply", (req, res) => {
    res.render("Apply", { page: "" ,applicationStatus:false})
})

router.post("/apply",async (req, res) => {
    var Appstatus = false;
    try {
        const applicationDetails = await new Application({
            studentFName :  req.body.studentFName,
            studentLName :  req.body.studentLName,
            dob          :  req.body.dob,
            gaurdianName :  req.body.gaurdianName,
            mobileNum    :  req.body.mobileNum,
            address      :  req.body.address,
            pincode      :  req.body.pincode
           
        })
        console.log(applicationDetails)
        const registered = await applicationDetails.save();    
        if(res.status(201)){
            Appstatus = true;
        }
        res.render('Apply',{applicationStatus:Appstatus})
        res.status(201).redirect("/apply")
    } catch (error) {
        if(res.status(400)){
            Appstatus = "error";
        }
        res.render('Apply',{applicationStatus:Appstatus})
        res.status(400).redirect("/")
    }
})
module.exports = router