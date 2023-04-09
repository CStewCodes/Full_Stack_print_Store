// declare dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

// =====initialize dependencies====
dotenv.config(); // pulls all of our .env variables that are hidden into our server.
const app = express();
app.use(express.json()); //parses all express requests into JSON
app.use(cors()); // handles cross-origin requests-- prevents requests coming from different ip addresses.
const port = process.env.PORT;

//======= initialize pool ========
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });
pool.connect();

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers").then((result) => {
    res.send(result.rows);
  });
});

app.get("/customers/:id", (req, res) => {
  pool
    .query(`SELECT * FROM customers WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows[0]);
    });
});

app.post("/customers", (req, res) => {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let email = req.body.email;
  pool
    .query(
      `INSERT INTO customers (f_name, l_name, email) VALUES ($1, $2, $3) RETURNING *`,
      [f_name, l_name, email]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

app.patch("/customers/:id", (req, res) => {
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const email = req.body.email;

  // Update customer record in database using id and request body
  pool
    .query(
      `UPDATE customers SET f_name=$1, l_name=$2, email=$3 WHERE id = ${req.params.id} RETURNING *`,
      [f_name, l_name, email]
    )
    .then((result) => {
      res.send(`User ${f_name} has been updated`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

app.delete("/customers/:id", (req, res) => {
  // Delete user record from database using userId
  pool
    .query(`DELETE FROM customers WHERE id= ${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(`User ${result.rows[0].f_name} has been deleted`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
