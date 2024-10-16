import User from "../models/user.model.js";
import generateToken from "../DataBase/GenerateToken.js";

const SignUp = async(req,res)=>{
    
    const {email, name , password} = req.body;
    
    if (!name || !email || !password) {
        res.status(404);
        throw new Error("Please provide all fields");
    }

    const foundUser = await User.findOne({email: email })

    if(foundUser){
        return res.status(400).json({msg: "Email already exists"})
    }

    const newUser = await User.create({
        name,
        email,
        password
    })
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        });
}else{
    res.status(400);
    throw new Error("Invalid user data");
}

}




const SignIn = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please provide all fields");
    }


    const foundUser = await User.findOne({email: email})
    if(foundUser && (await foundUser.matchPassword(password))){
        res.status(200).json({
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            token: generateToken(foundUser._id)
        });
    }else{
        res.status(400).json({msg: "Invalid emailss or password"})
    }
}





export {SignUp, SignIn};