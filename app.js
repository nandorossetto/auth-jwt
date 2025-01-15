require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
//Public Route
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello Hero"
    })
});
app.listen(3000);