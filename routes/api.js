const express = require('express');
const router = express.Router();
const user = require('../models/user');
const passport = require("passport");

const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


router.get('/users',function(req,res,next){
    user.find({}).then(function(users){
        res.send(users);
    }).catch(next);
});

router.post('/users',function(req,res,next){
    user.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
});

router.get("/login", function (req, res) {
    res.render("login");
});
 
router.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
});
 

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
module.exports = router;
