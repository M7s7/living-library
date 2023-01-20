if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const User = require('./models/userModel')// Might remove later

const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
const initialisePassport = require('./routes/passportConfig');
initialisePassport(
  passport,
  async (id) => await User.findById(id)
  );

const app = express();
app.use(cors());
app.use(express.json());

// Setting up auth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/scrape", require("./routes/scraper"));
app.use("/api", require("./routes/api"));

const port = 3001 || process.env.port;

// Connect to mongoose
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    })
  })
