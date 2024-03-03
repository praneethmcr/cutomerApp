const pool = require("../connection");

module.exports = {
  selectAll: () => {
    return pool.query(
      `SELECT sno,customer_name,age,phone,location, TO_CHAR(created_at, 'DD-MM-YYYY') AS date, TO_CHAR(created_at, 'HH24:MI:SS') AS time FROM customer_data ORDER BY sno`
    );
  },

  create: (newCustomer) => {
    return pool.query(
      "INSERT INTO customer_data(customer_name,age,phone,location) VALUES($1,$2,$3,$4)",
      [
        newCustomer.customer_name,
        newCustomer.age,
        newCustomer.phone,
        newCustomer.location,
      ]
    );
  },

  customerCount: () => {
    return pool.query("SELECT COUNT(*) as customerCount FROM customer_data");
  },
};
