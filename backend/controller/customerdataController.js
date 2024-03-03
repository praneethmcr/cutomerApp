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

exports.createCustomer = (req, res) => {
  console.log(req.body.customer_name);
  const newCustomer =  {'customer_name' : req.body.customer_name, 'age':req.body.age, 'phone':req.body.phone, 'location':req.body.location};
  customerData
    .create(newCustomer)
    .then((cust) => {
      res.json({ data: "inserted succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error in inserting New Customer");
    });
};
