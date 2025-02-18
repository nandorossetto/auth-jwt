const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const loginController = {
    auth: async(req, res) => {
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
            // const refresh = process.env.REFRESH;
            const token = jwt.sign({
                id: user._id
            }, secret, {expiresIn: process.env.EXPIRES_IN});
            // const refreshToken = jwt.sign({
            //     id: user._id
            // }, refresh, {expiresIn: "200"});
            // res.status(200).json({msg: "User authenticated", token: token, refreshToken: refreshToken});
            res.status(200).json({msg: "User authenticated", token: token});
        } catch (error) {
            res.status(500).json({msg: "Error"});
            console.log(error);
        }
    }
};
module.exports = loginController;