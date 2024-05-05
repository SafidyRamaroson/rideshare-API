const jwt = require("jsonwebtoken");
const db = require("./../models/index");

const authMiddleware = async (req, res, next) => {
    const token = req.header("token");
    
    if (!token) {
        return res.status(401).json({
            message: "Auth error"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.user.findOne({ where: { UserID: decoded.id } });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

module.exports = { authMiddleware };
