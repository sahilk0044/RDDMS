import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{

try{

const {name,email,password} = req.body;

const userExists = await User.findOne({email});

if(userExists){
return res.status(400).json({message:"User already exists"});
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hashedPassword
});

res.status(201).json({message:"User registered"});

}catch(error){

res.status(500).json({message:error.message});

}

};

export const login = async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({message:"Invalid credentials"});
}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(400).json({message:"Invalid credentials"});
}

const token = jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({message:"Login Successful",token});

}catch(error){

res.status(500).json({message:error.message});

}

};
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


export const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    // check user
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found"
      });
    }

    // check role (important)
    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Not an admin."
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};