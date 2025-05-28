const User = require("../../entities/User");
const bcrypt = require("bcrypt");
const registerController = {
    create: async(req, res) => {
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
    }
};
module.exports = registerController;