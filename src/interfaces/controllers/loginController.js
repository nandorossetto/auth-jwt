const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../entities/User");
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
            const token = jwt.sign({
                id: user._id
            }, process.env.SECRET, {expiresIn: "30s"});
            const refreshToken = jwt.sign({
                id: user._id
            }, process.env.REFRESH_TOKEN, {expiresIn: "1800s"});
            res.status(200).json({
                msg: "User authenticated", 
                token: token, 
                refreshToken: refreshToken
            });
        } catch (error) {
            res.status(500).json({msg: "Error"});
            console.log(error);
        }
    }
};
module.exports = loginController;