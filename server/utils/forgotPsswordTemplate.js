const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
    <p>
    Dear, ${name}
    </p>
    <p>You Are requested a password reset. Please use following OTP code to reset your Password.</p>
    <div style= "background: yellow; font-size: 20px; padding:20px; text-align:center">
    ${otp}
    </div>
    <p>This OTP is valid for 1 hour Only. Enter this otp in the Blinkeyit website to proceed with resetting your Password.</p>
    </br>
    </br>
    <p>Thanks!</p>
    <p>Blinkeyit</p>
    </div>
    
    `;
};
export default forgotPasswordTemplate