const jwt = require("jsonwebtoken");
const refreshController = {
    validate: async(req, res) => {
        const { refreshToken } = req.body;
         try {
            const token = jwt.sign(
                { refreshToken }, 
                process.env.SECRET, {expiresIn: "20s"}
            );
            return res.status(200).json({ token: token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: "Error"});
        }
    }
};
module.exports = refreshController;
