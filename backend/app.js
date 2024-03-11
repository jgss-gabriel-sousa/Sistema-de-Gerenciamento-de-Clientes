require("dotenv").config();
 
const PORT = process.env.PORT;

const express = require('express');
const cors = require('cors');
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(5000, () => {
    console.log("Server started");
});