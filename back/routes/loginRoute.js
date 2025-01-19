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
            if(process.env.ENVIRONEMENT !== 'PROD'){ console.log("Logged user", user.username); }
            const token = jwt.sign(
                { id: user._id, username : user.username, email : user.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn : '1h' }
            )
            res.cookie('jwtoken', token, { httpOnly: true, maxAge: 3600000 })
            res.status(200).json({ message : "Successful Login"})
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
    console.log(req.body)
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


export default router;