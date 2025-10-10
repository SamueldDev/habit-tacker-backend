
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// register a user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user);
    res.status(201).json({
        message: "user registered successfully",
        user: { id: user.id, name, email }, 
        token 
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


// log a user in
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ 
         message: "login successful",
        user: { 
            id: user.id,
            name: user.name,
            email 
        },
        token
         });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


