import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const SECRET_KEY = "your_secret_key"; 

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

let db;
try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "ins",
  });
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error.message);
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    console.log("Token verified for Admin ID:", req.user.id);
    next();
  });
};


// Add Insurance Plan
app.post("/api/insurance/add", verifyToken, async (req, res) => {
    const { name, existd, predictd, budget, addon, healths, descc } = req.body;
    const adminId = req.user.id;
  
    if (!name || !existd || !predictd || !budget || !addon || !healths || !descc) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const query = `INSERT INTO insplan (id, name, existd, predictd, budget, addon, healths, descc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.execute(query, [adminId, name, existd, predictd, budget, addon, healths, descc]);
  
      res.status(201).json({ message: "Insurance plan added successfully", id: result.insertId });
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ message: "Error adding insurance plan" });
    }
  });
  

//insurance plan display
app.get("/api/insurance/getByAdmin", verifyToken, async (req, res) => {
  const adminId = req.user.id; // Extracted from token

  try {
    const [plans] = await db.execute("SELECT * FROM insplan WHERE id = ?", [adminId]);
    res.json({ plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database query failed." });
  }
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Insurance plan server running on port ${PORT}`);
});