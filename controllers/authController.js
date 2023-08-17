import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

export const registerController = async(req,res) =>{
    try{
       const {name,email,password,phone,address,answer} = req.body;
       //validation
       if(!name){
           return res.send({message:'Name is Required'})
       }
       if(!email){
           return res.send({message:'email is Required'})
       }
       if(!password){
           return res.send({message:'Password is Required'})
       }
       if(!phone){
           return res.send({message:'Phone is Required'})
       }
       if(!address){
           return res.send({message:'Address is Required'})
       }
       if(!answer){
          return res.send({message:'Answer is Required'})
       }
    //check user
    const exisitingUser = await userModel.findOne({email})
    //exisiting user
    if(exisitingUser){
        return res.status(200).send({
            success: false,
            message: 'Already Registered please login',
        })
    }
    //register user
    const hashedPassword = await hashPassword(password)
    //save
    const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()
    
     res.status(201).send({
        success:true,
        message: 'User Register Successfully',
        user,
     })

    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registraion',
            error
        });
    }
};

// POST LOGIN
export const loginController = async () =>{
    try{
        const {email,password} = req.body
        //validation
        if(!email || password){
            return res.status(404).send({
                success:false,
                message: 'Invalid emsil or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await commparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        //token
        const JWT_SECRET = GJKWLSJIJDWSD12346;
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, 
            {expiresIn:'7d',
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        });
    };
};
//forgotPasswordController

export const forgotPasswordController = async(res,req) =>{
    try{
        const [email,answer, newPassword] = req.body
        if(!email){
            res.status(400).send({message: 'Email is required'})
        }
        if(!answer){
            res.status(400).send({message: 'Question is required'})
        }
        if(!newPassword){
            res.status(400).send({message: 'New password is required'})
        }
        //check
         const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }
        const hased = await hashedPassword(newPassword);
        await userModel.findByIdAndUpdate(user_id, {password, hased});
        res.status(200).send({
            success:true,
            message: "Password reset successfully"
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'something went wrong',
            error
        })
    }
}

// test controller
export const testController = (req,res) =>{
    try{
        res.send("Protected Routes");
    }catch(error){
        console.log(error);
        res.send({error});
    }
};