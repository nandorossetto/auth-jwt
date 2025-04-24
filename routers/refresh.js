const router = require("express").Router();
const refreshController = require("../controllers/refreshController");
const checkRefreshToken = require("../utils/checkRefreshToken");
router.route("/refresh").post(checkRefreshToken, (req, res) => {
    refreshController.validate(req, res);
});
module.exports = router;