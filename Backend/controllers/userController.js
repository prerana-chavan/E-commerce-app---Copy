import userModel from "../models/userModel.js";  // Make sure this file exists and exports the Mongoose model
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // Added expiration for the token
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
      return res.json({ success: false, message: "User does not exists." });
    }

    const isMatch = await bcryptjs.compare(password,user.password);

    if(isMatch){
      const token = createToken(user._id);
      res.json({success:true,token});
    }
    else{
      res.json({success:false,message:"invalid credentials"});
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Create a token for the user
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login (to be implemented)
const adminLogin = async (req, res) => {
  try {
    const {email,password}=req.body;
    if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"invalid details"})
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};

export { loginUser, registerUser, adminLogin };
