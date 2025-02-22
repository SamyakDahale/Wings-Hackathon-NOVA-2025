import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change
  password: "12345",
  database: "ins",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); 
  } else {
    console.log("Connected to MySQL database");
  }
});

// Route to store OutputData
app.post("/store-data", (req, res) => {
  const { extractedText, matchedKeyword, weightedAverage, manualEntryResults } =
    req.body;

  if (!extractedText || !matchedKeyword) {
    return res
      .status(400)
      .json({ message: "Extracted text and matched keyword are required" });
  }

  const query = `
    INSERT INTO output_data (extracted_text, matched_keyword, weighted_average, manual_entry_results)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [extractedText, matchedKeyword, weightedAverage, manualEntryResults],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }
      res.json({ message: "Data stored successfully", id: result.insertId });
    },
  );
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});