const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("local-signup"), 
  (req, res, next) => {
    res.send(`Successfully created ${req.user}`);
  }
)

router.post(
  "/login",
  passport.authenticate("local-login"),
  (req, res, next) => {
    res.send(`Successfully logged in ${req.user}`);
  }
)

router.delete("/logout", (req, res, next) => {
    const user = req.user;
    req.logout(err => {
      if (err) {
        console.log("Error in logout");
        next(err);
      }
    });
    res.redirect("/login");
  }
)

module.exports = router;