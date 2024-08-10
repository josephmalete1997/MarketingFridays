// server.js
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 3000; 

const uri = process.env.MONGODB_URI ;

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
    const database = client.db("your_database_name");
    const collection = database.collection("your_collection_name");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error retrieving data");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
