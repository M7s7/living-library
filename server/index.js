const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');

const app = express();
app.use(cors());
app.use(express.json());
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
