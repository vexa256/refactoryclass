const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3000;

// Enable JSON body parsing for Express
app.use(express.json());

app.use(cors());

require("./models");

let OurSQLiteData = new sqlite3.Database("./warehouse.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

// Create a new item route API
app.post("/CreateItem", (req, res) => {
  OurSQLiteData.run(
    `INSERT INTO warehouse(item_name, quantity) VALUES(?, ?)`,
    [req.body.item_name, req.body.quantity],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({
        status: "Item added to the database successfully",
      });
    }
  );
});

// Update an item route API
app.put("/UpdateItem/:id", (req, res) => {
  OurSQLiteData.run(
    `UPDATE warehouse SET item_name = ?, quantity = ? WHERE id = ?`,
    [req.body.item_name, req.body.quantity, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ changes: this.changes });
    }
  );
});

// Delete an item route API
app.delete("/DeleteItem/:id", (req, res) => {
  OurSQLiteData.run(
    `DELETE FROM warehouse WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ changes: this.changes });
    }
  );
});

// Get all items  route API
app.get("/", (req, res) => {
  OurSQLiteData.all(
    `SELECT id, item_name, quantity, created_at FROM warehouse`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
