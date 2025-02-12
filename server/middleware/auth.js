import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req?.headers?.authorization?.split("  ")[1]

        if(!token){
            return res.status(401).json({
                message :  "Provide Token",
                error: true,
                success: false
            })
        }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }
    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export default auth;
