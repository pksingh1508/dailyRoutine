import { Request, Response } from "express"
import jwt from 'jsonwebtoken';
import User from "../models/User";
import otpGenerator from 'otp-generator'
import OTP from "../models/OTP";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();

export const signup = async(req: Request, res: Response) => {
    try {
        // fetch the data from the body
        const {name, email, password, otp} = req.body;
        if(!name || !email || !password) {
            return res.status(403).json("fill all the details");
        }
        // check user is already signed up
        const exitstingUser = await User.findOne({email: email});
        if(exitstingUser) {
            return res.status(200).json({
                success: true,
                message: "User already signed up, Please login"
            })
        }

        // find the most recent otp
        const response = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
        console.log(response);
        if(response === null) {
            return res.status(404).json("Otp not found");
        }
        if(otp !== response.otp) {
            return res.status(404).json("Otp not matched");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 6);

        //create a new user
        const user = await User.create({name: name, email: email, password: hashedPassword});
        // return response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User creation failed",
            error: err
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        // find the user
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found, Please sign up first"
            })
        }
        // match the password
        if(await bcrypt.compare(password, user.password)) {
            if(!process.env.JWT_SECRET) {
                return res.status(401).json("Invalid Secret");
            }
            const token = jwt.sign(
                {email: user.email, id: user._id},
                process.env.JWT_SECRET, 
                {
                    expiresIn: "24h"
                }
            )
            user.token = token;
            user.password = "";

            const options = {
                expiresIn: new Date(Date.now() * 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).json({
                success: true,
                token, 
                user, 
                message: "user logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }
    } catch (err) {

    }
}

export const sendOtp = async(req: Request, res: Response) => {
    try {
        const email = req.body.email;
        if(!email) {
            return res.status(403).json("Email missing");
        }
        // verify the user
        const exitstingUser = await User.findOne({ email: email });
        if(exitstingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists"
            })
        }
        // generate a otp
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets: false});
        const otpPaylod = {email, otp};
        const otpResponse = await OTP.create(otpPaylod);
        if(otpResponse) {
            console.log("Otp send successfully");
            return res.status(200).json(otpResponse);
        }
    } catch (err) {
        return res.status(500).json("failded while sending otp ");
    }
}