const {v4: uuidv4} = require('uuid')
const User = require("../models/user")
const {setUser,getUser} = require("../service/auth")

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password, 
    });
    return res.redirect("/");

}

async function handleUserLogin(req,res){
    const {email,password} = req.body;

    const user = await User.findOne({email,password});

    if(!user) return res.render('login',{
        error: "Invalid Username or Password",
    })

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect("/");

}

function handleUserLogout(req,res){
    res.clearCookie("connect.sid"); // optional: clears session cookie
    res.redirect("/login"); // go back to login page
  };


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}