const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const {renderSignUpForm, signUp, renderLoginForm, login, logout} = require("../controller/users.js");

router
.route("/signup")
.get(renderSignUpForm)
.post(wrapAsync(signUp));

router
.route("/login")
.get(renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    login 
);

router.get("/logout", logout);

module.exports = router;