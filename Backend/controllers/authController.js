import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const register = async(req,res)=>{
    const { username, password, email, name, role } = req.body;

    try {
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            name,
            role: role || 'user',
        })
        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

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
