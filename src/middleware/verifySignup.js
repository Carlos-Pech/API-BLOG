import User from "../models/User.js"

export const verifyDuplicateEmail = async(req,res,next)=>
{
    const user = await User.findOne({email: req.body.email})

    if(user) return res.status(409).json({message: "the email is already use"})

    next();
}