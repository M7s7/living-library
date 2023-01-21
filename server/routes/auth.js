const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("local-signup"), 
  (req, res, next) => {
    console.log(`Successful signup for ${req.user.username}`);
    res.send(req.user.username);
  }
)

router.post(
  "/login",
  passport.authenticate("local-login"),
  (req, res, next) => {
    console.log(`Successful login for ${req.user.username}`);
    res.send(req.user.username);
  }
)

router.delete("/logout", (req, res, next) => {
    req.logout(err => {
      if (err) {
        console.log("Error in logout");
        next(err);
      }
    });
  }
)

module.exports = router;