const customerData = require("../models/customerModel");

exports.getCustomers = (req, res) => {
  customerData
    .selectAll()
    .then((customers) => {
      res.json(customers.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error getting in customer Data: ");
    });
};
