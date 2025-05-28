const jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next) => {
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({ msg: "Access denied"});
    }
    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token", error: error}).end();
    }
}
exports.checkRefreshToken = (req, res, next) => {
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