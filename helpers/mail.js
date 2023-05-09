import nodemailer from "nodemailer";
import config from 'config';

   const  sendMail = async(obj) =>{
      return new Promise(async (resolve, reject) => {
        try {
          const transporter= nodemailer.createTransport({
            host: config.get("SMTP_HOST"),  
            port: 587,
            secure: false,
            auth: {
              user:config.get("SMTP_USERNAME"),
              pass:config.get("SMTP_PASSWORD")
            }
          });
      
          const mailOptions = {
            from: '"Test User" testuser@gmail.com', // sender address
            to: obj.email,
            subject: 'OTP',
            html: `<b>Email - ${obj.email}</b><br>
                  <b>OTP - ${obj.otp}</b>`,
          };
          const info = await transporter.sendMail(mailOptions);
          if (!info.messageId) return resolve({ status: false })
          resolve({ status: true, messageId: info.messageId })
        } catch (err) {
          console.log(err);
          const error = new Error(err.message);   
          error.statusCode = 500; 
          reject(error)
        }
      })
  
    }
  
  
  export default sendMail