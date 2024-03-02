const express = require("express");
const pool = require("./connection");

const app = express();
const port = 3000;

app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sno,customer_name,age,phone,location,
       TO_CHAR(created_at, 'DD-MM-YYYY') AS date, 
       TO_CHAR(created_at, 'HH24:MI:SS') AS time 
       FROM customer_data`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
