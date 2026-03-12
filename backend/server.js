const express = require("express");
const cors = require("cors");

const importCSV = require("./importcsvAPI");
const latinAPI = require("./LatinAPI");
const saberAPI = require("./SaberAPI");
const userAPI = require("./userAPI");
const awardsAPI = require("./AwardsAPI");
const plaqueAPI = require("./PlaqueAPI")
const streamerAPI = require("./StreamerAPI");
const studentAPI = require("./studentAPI");
const app = express();

app.use(cors());
app.use(express.json());

console.log("Registering routes...");


app.use("/api", importCSV);
app.use("/api", latinAPI);
app.use("/api", saberAPI);
app.use("/api", userAPI);
app.use("/api", awardsAPI);
app.use("/api", plaqueAPI);
app.use("/api", streamerAPI);
app.use("/api", studentAPI);

app.get("/", (req, res) => res.json({ message: "Server running" }));


app.get("/api/routes", (req, res) => {
    const routes = [];
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            routes.push({
                path: r.route.path,
                methods: Object.keys(r.route.methods)
            });
        } else if (r.name === 'router' && r.handle.stack) {
            r.handle.stack.forEach(function(handler){
                if (handler.route) {
                    routes.push({
                        path: '/api' + handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });
    res.json(routes);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});