const express = require("express");


const app = express();
const port = 3000;

const customerdataRoute = require('./routes/customerdataRoute');

app.use('/customer', customerdataRoute);  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
