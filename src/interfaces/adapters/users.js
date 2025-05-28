const router = require("express").Router();
const userController = require("../controllers/userController");
const { checkToken } = require("../../utils/checkToken");
router.route("/users/:id").get(checkToken, (req, res) => {
    userController.get(req, res);
});
module.exports = router;