import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/chatbot", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  const responses = {
    hello: "Hi there! 😊",
    help: "I'm here to assist you. Ask me anything!",
    bye: "Goodbye! Have a nice day! 👋",
  };

  const reply = responses[userMessage] || "I'm not sure about that yet. 🤔";
  res.json({ reply });
});

app.listen(5000, () => console.log("Server running on port 5000"));


export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
  