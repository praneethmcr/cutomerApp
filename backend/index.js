const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
})); 

const customerdataRoute = require("./routes/customerdataRoute");

app.use("/customer", customerdataRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
