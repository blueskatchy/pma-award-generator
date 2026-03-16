const express = require("express");
const cors = require("cors");

const importCSV = require("./importcsvAPI");
const latinAPI = require("./LatinAPI");
const saberAPI = require("./SaberAPI");
const userAPI = require("./userAPI");
const awardsAPI = require("./AwardsAPI");
const plaqueAPI = require("./PlaqueAPI");
const streamerAPI = require("./StreamerAPI");
const studentAPI = require("./studentAPI");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Registering routes...");

// Register APIs
app.use("/api", importCSV);
app.use("/api", latinAPI);
app.use("/api", saberAPI);
app.use("/api", userAPI);
app.use("/api", awardsAPI);
app.use("/api", plaqueAPI);
app.use("/api", streamerAPI);
app.use("/api", studentAPI);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.get("/api/routes", (req, res) => {
  const routes = [];

  if (!app._router) {
    return res.json({ message: "Router not initialized yet" });
  }

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods),
      });
    } else if (middleware.name === "router" && middleware.handle.stack) {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: "/api" + handler.route.path,
            methods: Object.keys(handler.route.methods),
          });
        }
      });
    }
  });

  res.json(routes);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});