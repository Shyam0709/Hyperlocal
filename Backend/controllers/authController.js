import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
import { saveOtp,verifyOtp,clearOtp } from '../models/otpStore.js';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Step 1: Request OTP
export const requestOtp = async (req, res) => {
  const { username, email, password, name, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send OTP to email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Hyperlocal Registration',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    // Temporarily store OTP + user data
    saveOtp(email, otp, { username, email, hashedPassword, name, role: role || 'user' });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

// Step 2: Verify OTP and Create User
export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp } = req.body;

  const userData = verifyOtp(email, otp);
  if (!userData) return res.status(400).json({ message: 'Invalid or expired OTP' });

  try {
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.hashedPassword,
      name: userData.name,
      role: userData.role,
    });

    await newUser.save();
    clearOtp(email);

    res.status(201).json({ message: 'Registration complete' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async(req,res)=>{
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

    
        const token = jwt.sign(
            { _id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    } 
}
