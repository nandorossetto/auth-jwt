require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const connection = require("./db/connection");
const User = require("./models/User");
connection();
//Public Route
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello Hero"
    })
});
app.post("/auth/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if(!name){
        return res.status(422).json({ msg: "Name is required"});
    }
    if(!email){
        return res.status(422).json({ msg: "Email is required"});
    }
    if(!password){
        return res.status(422).json({ msg: "Password is required"});
    }
    if(!confirmPassword){
        return res.status(422).json({ msg: "Password is required"});
    }
    if(password !== confirmPassword){
        return res.status(422).json({ msg: "Password does not match"});
    }
    const userExists = await User.findOne({ email: email });
    if(userExists){
        return res.status(422).json({ msg: "Email already exists"});
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        email,
        password
    });
    try {
        await user.save();
        res.status(201).json({ msg: "User created"});
    } catch (error) {
        res.status(500).json({ msg: "Error"});
        console.log(error);
    }
});
app.listen(3000);
