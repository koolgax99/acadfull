const express = require("express")
const router = express.Router()
const contact = require("../models/contact")

router.get("/contact", (req, res) => {
    res.render("contact", { page: " " ,ContactStatus:false })
})

router.post("/contact",async (req, res) => {
    let formstatus = false
    try {
        const ContactDetails = await new contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
           
        })
        console.log(ContactDetails)
        const registered = await ContactDetails.save();
        if(res.status(201)){
            formstatus = true;
        }
        res.render('contact',{ContactStatus:formstatus})
        res.status(201).redirect("/contact");
    } catch (error) {
       
    }
})
module.exports = router