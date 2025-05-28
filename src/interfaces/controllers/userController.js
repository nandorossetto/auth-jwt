const User = require("../../entities/User");
const userController = {
    get: async (req, res) => {
        const _id = req.params.id;
        let user = {};
        try {
            user = await User.findById(_id, "-password");
            res.status(200).json({user});
        } catch (error) {
            return res.status(404).json({msg: "User not found"});
        }
    }
};
module.exports = userController;
