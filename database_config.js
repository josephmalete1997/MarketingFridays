// server.js
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 3000; // Port number for your server
require("dotenv").config();

// Use environment variables for sensitive information
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors()); // Enable CORS
app.use(express.json());

// Route to get data from MongoDB
app.get("/api/data", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("MarketingFridaysDB");
    const collection = database.collection("Articles");
    const data = await collection.find({}).toArray();
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).send("Error retrieving data");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
