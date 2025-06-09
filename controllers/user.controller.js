import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        } 
        // finding user ke wo kahi is user id se register to nhi.
        const user = await User.findOne(email)
        if(user) {
              return res.status(403).json({
                success: false,
                message: "This email id is Already Registered."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        }) 
         
    } catch (error) {
        console.log(error)
    }
}