require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const connection = require("./db/connection");
connection();
//Public Route
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello Hero"
    })
});
app.post("auth/register", (req, res) => {
    const {name, email, pass, confirmPass} = req.body;
});
app.listen(3000);
