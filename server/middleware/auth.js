import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const auth = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing. Please login again or provide a valid token in Authorization headers.",
        error: true,
        success: false,
      });
    }

    
      console.log("Extracted Token:", token);

        // Verify the token
        const decode = jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }
        
        // Attach user ID to request object
        req.userId = decode.id;
        next();

        console.log("Decoded Token:", decode);
    
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed. Please login again.",
            error: true,
            success: false,
        });
    }
};
export default auth;
