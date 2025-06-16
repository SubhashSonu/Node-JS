const express = require('express');
const URL = require('../models/url');


const router = express.Router();

router.get('/',async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render("home",
        {urls: allUrls}
    );
})

router.get('/signup', (req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login")
})

router.get("/dashboard",(req,res)=>{
    return res.render("dashboard");
})



module.exports = router;