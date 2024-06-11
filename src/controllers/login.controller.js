import { jwtSecretKey } from "../config.js";
import Roles from "../models/Roles.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { token } from "../middleware/token.js";

export const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password: await User.encryptPassword(password),
        });

        const saveUser = await newUser.save();
        const createdToken = token(saveUser._id);


        res.status(200).json({
            id: saveUser._id,
            name: saveUser.name,
            email: saveUser.email,
            password: saveUser.password,
            token: createdToken,
        });
    } catch (error) {
        

        res.status(500).json({ message: "Something went wrong", error: error.message});
    }
};

export const sigInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "empity fields" });

        const userFound = await User.findOne({
            email: req.body.email,
        });

        if (
            !userFound 
        ) {
            return res.status(400).json({ message: "Email not found " });
        }

        const matchPassword = await User.comparePassword(
            password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({ message: "Invalid password" });

        const createdToken = token(userFound._id);

        res.status(200).json({
            message: "Successfull login",
            id: userFound._id,
            name: userFound.name,     
            email: userFound.email,
            token: createdToken,
        });
    } catch (error) {
         (error);

        return res.status(500).json({ message: "Something went wrong", error: error.message});
    }
};
