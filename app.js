require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const connection = require("./db/connection");
const User = require("./models/User");
connection();
function checkToken(req, res, next){
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({ msg: "Access denied"});
    }
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token"});
    }
}
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
        password: passwordHash
    });
    try {
        await user.save();
        res.status(201).json({msg: "User created"});
    } catch (error) {
        res.status(500).json({msg: "Error"});
        console.log(error);
    }
});
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email){
        return res.status(422).json({msg: "Email is required"});
    }
    if(!password){
        return res.status(422).json({msg: "Password is required"});
    }
    const user = await User.findOne({ email: email });
    if(!user){
        return res.status(404).json({msg: "User or password not found"});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(404).json({msg: "User or password not found"});
    }
    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id
        }, secret);
        res.status(200).json({msg: "User authenticated", token});
    } catch (error) {
        res.status(500).json({msg: "Error"});
        console.log(error);
    }
});
//Private route
app.get("/user/:id", checkToken, async (req, res) => {
    const _id = req.params.id;
    let user = {};
    try {
        user = await User.findById(_id, "-password");
        res.status(200).json({user});
    } catch (error) {
        return res.status(404).json({msg: "User not found"});
    }
});
app.listen(3000);
