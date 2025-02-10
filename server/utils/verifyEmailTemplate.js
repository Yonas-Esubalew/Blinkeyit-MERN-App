const verifyEmailTemplate = ({name,url})=> {
    return`
    <p>Dear ${name}</p>
    <p>Thank you for Registering Blinkeyit.</p>
    <a href=${url} style="color:white; backgroud:blue; margin-top: 10px
    ">
    Verify Email
    </a>
    `
}

export default verifyEmailTemplate