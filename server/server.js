import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

/* Initializing the express server */
const app = express();

app.use(express.json());
app.use(cors());

/* Setting the default port */
const port = 3000;

/* Getting Mongo DB connection string from .env file */
const MONGO_DB = process.env.MONGO_DB;

/* Getting connected to MongoDB */
mongoose
  .connect(MONGO_DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

/* Creating the schema/model in Mongo DB collection */
const companySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Company = new mongoose.model("company", companySchema);

/* Setting up the CRUD routes */
app.post("/api/companies", async (req, res) => {
  const company = new Company({ ...req.body });

  const result = await company.save();

  res.send(result);
});

app.get("/api/companies", async (req, res) => {
  const companies = await Company.find();

  res.send(companies);
});

app.put("/api/companies/:id", async (req, res) => {
  const { id } = req.params;

  const company = await Company.findByIdAndUpdate(id, { ...req.body });

  if (!company) {
    return res.status(404).json({ message: "company not found" });
  } else {
    res.send(company);
  }
});

app.delete("/api/companies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
    res.send({ message: "company deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
