import bcryptjs from "bcryptjs"
import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(req,res){
    try {
        const  {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Provide All Required Fileds!",
                error: true,
                success: false
            })
        }

        const user = UserModel.findOne({ email})

        if(user){
            return res.json({
                message: "Already Register Email",
                error: true,
                sucess: false
            })
        }


        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify Email from Blinkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl

            })
        })
        return res.json({
            message: "User register sucessfully!!",
            error: false,
            success: true,
            data: save
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            sucess: false
        })
    }
}