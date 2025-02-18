const router = require("express").Router();
router.route("/").get((req, res) => {
    res.status(200).json({
        msg: "Hello Hero"
    })
});
module.exports = router;