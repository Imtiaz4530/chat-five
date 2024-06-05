import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password does not match." });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exist." });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Generating Profile Picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //  Generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }
  } catch (e) {
    console.log("Error In SIgnup Controller ---> ", e.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Password Not Correct!" });
    }

    res.status(200).json({ success: "Login Successful." });
  } catch (e) {
    console.log("Error In Login Controller ---> ", e.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const logoutUser = (req, res) => {
  console.log("Logout");
};
