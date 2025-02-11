import bcryptjs from "bcryptjs";
import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { error } from "console";
import generatedAcessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide All Required Fileds!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already Register Email",
        error: true,
        sucess: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Email from Blinkeyit",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });
    return res.json({
      message: "User register sucessfully!!",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      sucess: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const code = req.body;
    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verify Email Done!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Login Controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({
        message: "Provide All Required Fileds!",
        error: true,
        success: false
      })
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not Register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password!",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAcessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accesstoken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);

    return res.json({
      message: "Login SuccessFully!",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    res.status(500).json({
      messsage: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Logout Controller
export async function logoutController(req,res){
  try {
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }
    res.clearCookie("accessToken",cookiesOption)
    res.clearCookie("refreshToken", cookiesOption)


    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
      refresh_token : ""
    })

    return res.json({
      message: "Logout Successfully!",
      error: false,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      sucess: false

    })
  }
}