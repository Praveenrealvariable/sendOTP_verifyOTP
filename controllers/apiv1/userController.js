
import otpModel from "../../models/otpModel.js";
import { emailValidtion, validateOTP } from "../../validations/emailValidations.js"
import sendMail from "../../helpers/mail.js";

const sendOTP = async (req, res, next) => {
    try {
        if (!Object.keys(req.body).length) {
            const err = new Error('Invalid Request');
            err.statusCode = 400;
            throw err
        }
        if (!req.body.email) {
            const err = new Error('Please enter email address');
            err.statusCode = 400;
            throw err
        }
        const email = req.body.email.toLowerCase()
        let valid = await emailValidtion({ email: email })
        if (!valid.status) {
            const err = new Error(valid.errors);
            err.statusCode = 400;
            throw err
        }
        const otp = {
            email: email,
            otp: Math.floor(1000 + Math.random() * 999999),
            expireAt: new Date().getTime() + 300 * 1000, //expires in 5 min
        }
        const sendEmail = await sendMail({ ...otp })
        if (!sendEmail.status) {
            const err = new Error('Unable to send OTP mail');
            err.statusCode = 400;
            throw err
        }
        let otpDetails = await otpModel.create({ ...otp, messageId: sendEmail.messageId })
        res.status(201).send({ status: true, message: "OTP sucessfully sent to email" })
    } catch (error) {
        console.log(error)
        next(error)
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        if (!Object.keys(req.body).length) {
            const err = new Error('Invalid Request');
            err.statusCode = 400;
            throw err
        }
        let otpData = {
            email: req.body.email.toLowerCase(),
            otp: req.body.otp,
        }
        let valid = await validateOTP({ ...otpData })
        if (!valid.status) {
            const err = new Error(valid.errors);
            err.statusCode = 400;
            throw err
        }
        const otpDetails = await otpModel.findOne({
            email: otpData.email,
            otp: req.body.otp,
        });
        if (otpDetails) {
            let currentTime = new Date().getTime();
            let diff = otpDetails.expireAt - currentTime;
            if (diff < 0) {
                const err = new Error("The OTP has expired. Please request a new OTP.");
                err.statusCode = 401;
                throw err
            } else {
                res.status(200).json({ status: true, message: "OTP is successfully verified" });
            }
        } else {
            const err = new Error("Invalid OTP");
            err.statusCode = 401;
            throw err
        }
    } catch (error) {
        console.log(error)
        next(error)
    }



};

export { sendOTP, verifyOTP };