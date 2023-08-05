import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//user registration
export const register = async (req, res) => {

    try {

        const {username, email, password} = req.body;

        const existingUsername = await User.findOne({username})
        const existingEmail = await User.findOne({email})

        if(existingEmail) {
            res.status(400).json({
                success : false,
                message: "Email already registered."
            })
            return;
        }

        if(existingUsername){
            res.status(400).json({
                success: false,
                message: "Username already exist, find another one."
            })
            return;
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({ 
            username,
            email,
            password: hash,
            // photo: req.body.photo
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create, Try Again",
        })
    }
}

//user login
export const login = async (req, res) => {

    const email = req.body.email;

    try {

        const user = await User.findOne({email})

        // if user doesn't exist
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not Found",
            })
        }

        // if user is exist then check pass or compare the pass

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        // if password is incorrect
        if(!checkCorrectPassword){
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const {password, role, ... rest} = user._doc

        // create jwt token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY,
        {
            expiresIn: '1d'
        })

        // set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires:token.expiresIn
        }).status(200).json({
            token,
            data: { ... rest},
            role,
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
        
    }
}