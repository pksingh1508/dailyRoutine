
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (!process.env.JWT_SECRET) {
                return res.status(401).json("Invalid token");
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    console.error(err);
                    return res.sendStatus(403);
                }
                if (!payload) {
                    console.log("error in payload");
                    return res.sendStatus(403);
                }
                if (typeof payload === 'string') {
                    console.log("error in type of payload");
                    return res.sendStatus(403);
                }
                // console.log("Payload", payload);
                req.headers["userId"] = payload.id;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token"
        })
    }
}