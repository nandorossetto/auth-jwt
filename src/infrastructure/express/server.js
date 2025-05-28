const express = require("express");
const app = express();
const routes = require("../../interfaces/adapters/routes");
app.use(express.json());
app.use("/", routes);
module.exports = app;