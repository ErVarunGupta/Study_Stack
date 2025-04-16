import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const homeValidation = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!",
            success: false,
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false,
        });
    }
}