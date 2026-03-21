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



export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ user not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ❌ not admin
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only."
      });
    }

    // ❌ wrong password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // include role 🔥
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // 🔥 IMPORTANT (frontend uses this)
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};