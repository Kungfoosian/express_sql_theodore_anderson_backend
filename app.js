// Followed tutorial @ https://www.youtube.com/watch?v=HPIjjFGYSJ4

const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

// Set up Cross Origin Resource Sharing
app.use(cors());

// Create database connection and connect to it
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_react_sql_theodore_anderson"
});

database.connect(err => {
  if (err) throw err;
  console.log(`Connected to '${database.config.database}' database`);
});

// Set up routes
// Main route
app.get("/", (req, res) => {
  res.send("Go to /products to view our products");
});

// Get all products
app.get("/products", (req, res) => {
  var getAllQuery = "SELECT * from products";

  database.query(getAllQuery, (err, result) => {
    if (err) return res.send(err);
    if (result.length === 0) {
      res.json({ msg: "Go to /products/add to add products" });
    } else {
      res.json(result);
    }
  });
});

// Get a specific product
app.get("/products/:name", (req, res) => {
  // console.log(req.params.name);
  var getOneQuery =
    "SELECT * FROM products WHERE name LIKE '%" + req.params.name + "%'";

  database.query(getOneQuery, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({
        msg: "Object doesn't exist...yet. Go to /products/add to add products"
      });
    }
  });
});

// Add products
app.get("/products/add", (req, res) => {
  var { name, price } = req.query; // req.query returns a json object whose keys = name, price, respectively
  var addProductQuery = `INSERT INTO products(name, price) VALUES ('${name}', '${price}')`;

  database.query(addProductQuery, (err, result) => {
    if (err) return res.send(err);

    res.json({
      msg: `Product Added Successfully.`
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
