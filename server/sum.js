import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/SumValue", (req, res) => {
    const { age, annualIncome, policyValue } = req.body;

    if (!age || !annualIncome || policyValue === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    let sumAssured = 0;

    if (age >= 20 && age <= 30) {
        sumAssured = (annualIncome * 12) - policyValue;
    } else if (age >= 31 && age <= 55) {
        sumAssured = (annualIncome * 7) - policyValue;
    } else if (age > 55) {
        sumAssured = (annualIncome * 4) - policyValue;
    } else {
        return res.status(400).json({ error: "Invalid age range" });
    }

    res.json({ sumAssured });
});

const PORT = 8010;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
