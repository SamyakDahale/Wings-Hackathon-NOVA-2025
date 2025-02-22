import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const SECRET_KEY = "your_secret_key"; // Use a strong secret key in production

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

// Store lifestyle factors
app.post("/api/lifestyle/save", verifyToken, async (req, res) => {
    const { exercise, smoking, drinking, job_hazard, mental_stress } = req.body;
    const userId = req.user.id;
  
    console.log("Received request body:", req.body);
    console.log("User ID from token:", userId);
  
    try {
      // Check for missing fields
      if ([exercise, smoking, drinking, job_hazard, mental_stress].some(val => val === undefined || val === null)) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Insert into the database
      const query = `
        INSERT INTO lifestyle_factors 
        (id, exercise, smoking, drinking, job_hazard, mental_stress) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      await db.execute(query, [
        userId,
        exercise,
        smoking,
        drinking,
        job_hazard,
        mental_stress
      ]);
  
      res.status(201).json({
        message: "Lifestyle factors saved successfully",
        data: { userId, exercise, smoking, drinking, job_hazard, mental_stress },
      });
  
    } catch (error) {
      console.error("Error saving lifestyle factors:", error);
      res.status(500).json({ message: "Error saving lifestyle factors", error: error.message });
    }
  });

  
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Lifestyle factors server running on port ${PORT}`);
});