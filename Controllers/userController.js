const User = require ('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtkey = process.env.JWT_SECRET || "defaultSecretKey"

// SignUp
exports.signup = async(req, res) => {
    const{name,email,password,contact} = req.body
    try {

let existingUser = await User.findOne({email});
if(!existingUser){
    const saltRound = 10;
const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = new User({
        name,
        email,
        password:hashedPassword,
        contact,
    });
    const savedUser = await user.save();
        if(savedUser){
            return res.status(200).json({ success: true, data: { savedUser } });
        }
        else{
            return res.status(500).json({ error: "Internal server error" });
        }
} 
else{
    return res.status(400).json({message: "Email already exist"})
} 
    }
catch (error) {
    return res.status(500).json({ error: "Internal server error" });
}
}


// login
exports.login = async(req,res)=>{
    const{email,password} = req.body
    try{
        const existUser = await User.findOne({email});
        if(!existUser){
            res.json({message : "Invalid user"})
        }
const match = await bcrypt.compare(password,existUser.password)
if (!match) {
    return res.status(401).json({ message: "Incorrect password" });
}
        else{
            let token = jwt.sign({userid : existUser._id , role : User.role},jwtkey,{expiresIn:'10d'})
            //    return res.header('authorization', token ).json({ success: true, message: 'Logged in successfully' , user: existingUser ,token : token })
                return res.cookie("Token", token , { httpOnly : true })
                    .status(200)
                    .json({ success: true, message: 'Logged in successfully' , user: existUser , role : User.role ,token : token })
                  // Set the Authorization header with the JWT token
                
                // res.json({token})
        }
    }
    catch(error){
        return res.send(error)
    }
}
