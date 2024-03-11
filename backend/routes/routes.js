const express = require("express");
const { listClients } = require("../controllers/listClients");
const { registerClient } = require("../controllers/registerClient");
const { calculateRoute } = require("../controllers/calculateRoute");
    
const routes = express();

routes.get("/", async (req, res) => {
    return res.status(200).send("Funcionando");
});
routes.get("/clients", listClients);
routes.get("/calculateRoute", calculateRoute);

routes.post("/register", registerClient);

module.exports = routes;