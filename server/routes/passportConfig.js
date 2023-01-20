const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");

function initialise(passport, getUserbyID) {
  const createUser = async (username, password, done) => {
    try {
      const userExists = await User.findOne({ username: username });
      if (userExists) {
        return done(null, false, { message: "Username already exists!" });
      }
      // Create new user
      const user = await User.create({ username, password });
      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e, false);
    }
  }

  const authenticateUser = async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "No user with that name exists!" });
      }
      const isMatch = await user.validatePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password!" });
      }
      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e, false);
    }
  }

  passport.use(
    "local-signup",
    new LocalStrategy({
      usernameField: "username",
      passwordField: "password"
    }, 
    createUser
  ))

  passport.use(
    "local-login",
    new LocalStrategy({
      usernameField: "username",
      passwordField: "password"
    },
    authenticateUser
  ))
  // Serialise and de-serialise methods
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserbyID(id);
    return done(null, user);
  })
}

module.exports = initialise;
