import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

const router = express.Router();

async function findUser(username, email){
    const user = await User.findOne({ 
        $or : [
            { username : username },
            { email : email }
        ]
    })
    return user;
}

router.post('/', async (req, res) => {
    const {identifier, password} = req.body
    try{
        const user = await findUser(identifier, identifier)
        if(!user){ return res.status(400).json({ message : "Incorrect username or Password"} ); }
        if (await bcrypt.compare(password, user.password)){
            if(process.env.ENVIRONEMENT !== 'PROD') console.log("Logged user", user.username);
            const access_token = jwt.sign(
                { user_id: user._id, username : user.username, email : user.email },
                process.env.JWT_ACCESS_TOKEN,
                { expiresIn : '15m' }
            )
            const refresh_token = jwt.sign(
                { user_id: user._id },
                process.env.JWT_REFRESH_TOKEN,
                { expiresIn: '12h'}
            )

            return res.cookie(
                'access_token', 
                access_token, 
                { maxAge: 1000 * 60 * 10 }            
            ).cookie(
                'refresh_token', 
                refresh_token, 
                { httpOnly: true, maxAge: 1000 * 60 * 60 * 12, secure: process.env.ENVIRONEMENT === 'PROD'}
            ).status(200).json({ message : "Successful Login"})
        }else {
            return res.status(403).json({ message : "Incorrect username or Password"} );
        }
        return user;
    } catch (error) {
        if(process.env.ENVIRONEMENT !== 'PROD'){ console.error("Error finding user", error); }
        return res.status(400).json({ message : "Incorrect username or Password"} );
    }
})


router.post('/register', async (req, res) => {
    const { username, email, password, retypePassword } = req.body
    if( password !== retypePassword ){ return res.status(400).json({ error : "Both passwords ont equal"}) }
    const user = await findUser(username, email)
    if(user){ return res.status(400).json({ error : "username or email already exists"}) }
    const salt = await bcrypt.genSalt(11);
    const newuser = new User({ 'username' : username, 'email' : email, 'password' : await bcrypt.hash(password, salt) });
    newuser
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(400).json({ error: error.message }));
})

router.post('/logout', async (req, res) => {
    if(req.cookies?.access_token){ res.clearCookie('access_token') }
    if(req.cookies?.refresh_token){ res.clearCookie('refresh_token') }
    return res.status(200).json({ message : 'Successfuly loged out'})

})

export default router;