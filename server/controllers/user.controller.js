import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // finding user ke wo kahi is user id se register to nhi.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This email id is Already Registered.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// export const login = async (req, res) => {
//   try {
//     console.log(req.headers);
//     const serverHeader = res.set("User", "Arslan King");

//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect Email or Password",
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect Password",
//       });
//     }

//     const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: `1d`,
//     });

//     return res
//       .status(200)
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .json({
//         success: true,
//         message: `Welcome back ${user.fullName}`,
//       });
//   } catch (error) {}
// };

export const login = async (req, res) => {
  try {
    console.log("Login API hit");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log("JWT Token:", token);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
      });
  } catch (error) {
    console.error("Login Error:", error.message); // Show error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token","", {maxAge: 0}).json({
      success: true,
      message: "User logout successfully"
    })
  } catch (error) {
    console.log(error)
  }
}
