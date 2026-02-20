// server.js
const express = require("express");
const cors = require("cors");

const importCSV = require("./importcsvAPI");
const latinAPI = require("./LatinAPI");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", importCSV);
app.use("/api", latinAPI);

app.get("/", (req, res) => res.json({ message: "Server running" }));

app.listen(3001, () => console.log("🚀 Server running on port 3001"));