const express = require("express");
const { listClients } = require("../controllers/listClients");
const { registerClient } = require("../controllers/registerClient");
const { calculateRoute } = require("../controllers/calculateRoute");
    
const routes = express();

routes.get("/", (req, res) => res.status(200).send("Server Online"));

routes.get("/clients", listClients);
routes.get("/calculateRoute", calculateRoute);

routes.post("/register", registerClient);

module.exports = routes;