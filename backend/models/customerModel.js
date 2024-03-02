const pool = require("../connection");

module.exports = {
    selectAll: () => {
      return pool.query(`SELECT sno,customer_name,age,phone,location, TO_CHAR(created_at, 'DD-MM-YYYY') AS date, TO_CHAR(created_at, 'HH24:MI:SS') AS time FROM customer_data`); 
    }
}
