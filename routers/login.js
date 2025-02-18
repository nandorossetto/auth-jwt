const router = require("express").Router();
const loginController = require("../controllers/loginController");
router.route("/login").post((req, res) => {loginController.auth(req, res)});
module.exports = router;