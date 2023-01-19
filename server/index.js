const express = require('express');
const cors = require('cors');

const app = express();
// Routes
const scraper = require("./routes/scraper");

app.use(cors());
app.use("/scrape", scraper);

const port = 3001 || process.env.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})