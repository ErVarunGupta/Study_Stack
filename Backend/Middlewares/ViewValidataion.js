import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const viewValidation = async (req, res, next) => {
    const token = req.headers["authorization"]; 
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!",
            success: false,
        });
    } 

    const queryID = req.params.id;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        const loginID = req.user.id;
        if (loginID !== queryID) {
            return res.status(403).json({
                message: "You are not authorized to view profile of this user!",
                success: false,
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false,
        });
    }

    next();

}