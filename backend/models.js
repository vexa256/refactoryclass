const sqlite3 = require("sqlite3").verbose();
// Initialize SQLite database
let OurSQLiteData = new sqlite3.Database("./warehouse.sqlite", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
});

// Create table
OurSQLiteData.run(
    `CREATE TABLE IF NOT EXISTS warehouse (
    id INTEGER PRIMARY KEY,
    item_name TEXT,
    quantity INTEGER,
    created_at DATE DEFAULT CURRENT_TIMESTAMP
)`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Warehouse table created");
    }
);