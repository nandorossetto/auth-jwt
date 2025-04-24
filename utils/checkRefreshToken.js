const jwt = require("jsonwebtoken");
const checkRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if(!refreshToken){
        return res.status(401).json({ msg: "Access denied"});
    }
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token", error: error}).end();
    }
}
module.exports = checkRefreshToken;