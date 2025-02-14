import bcryptjs from "bcryptjs";
import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { error } from "console";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPsswordTemplate.js";
import jwt from "jsonwebtoken";
//Register controller
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
//Verify Email Controller
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

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide All Required Fileds!",
        error: true,
        success: false,
      });
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

    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accesstoken, cookiesOption);
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
export async function logoutController(req, res) {
  try {
    const userid = req.userId; //middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout Succesfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: message.error || error,
      error: true,
      success: false,
    });
  }
}
//  upload user Avatars
export async function uploadAvatar(req, res) {
  try {
    const userid = req.userId;
    const image = req.file;
    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userid, {
      avatar: upload.url,
    });

    return res.json({
      message: "upload profile",
      data: {
        _id: userid,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update user details
export async function updataUserDetails(req, res) {
  try {
    const userId = req.userId; // auth middleware

    const { name, email, mobile, password } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
      }
    );
    return res.json({
      message: "Updated User Successfully!",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forward password controller
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email not Available",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; // 1hour

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from Blinkeyit!",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.json({
      message: "Check your Email",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// verify forgot password OTP
export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field Email, OTP",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email not Available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP is Expired!",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP, Please try again.",
        error: true,
        success: false,
      });
    }

    //if OTP is not Expired
    //OTP == user.forgot_password_otp
    return res.json({
      message: "Email Verification successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// reset the password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields!",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not Available!",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be Same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);
    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password Updated Successfully!",
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

//refresh token controller
export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]; // [bareer token]

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(400).json({
        message: "Token is expired!",
        error: true,
        success: false,
      });
    }
    console.log("verifyToken", verifyToken, cookiesOption);

    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken,newAccessToken);

    return res.json({
      message: "New Access Token Generated",
      error: false,
      success: true,
      data : {
        accessToken : newAccessToken
      }
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
