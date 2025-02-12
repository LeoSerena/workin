import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import winston from 'winston';

function is_token_expiring_soon( exp ){
    const current_time = Math.floor(Date.now() / 1000)
    const buffer_time = process.env.TOKEN_BUFFER_TIME_MINUTES * 60
    const is_expiring_soon = ( exp - current_time ) <= buffer_time
    return is_expiring_soon
}

export function verifyToken(req, res, next){
    if(process.env.ENVIRONMENT !== 'PROD') console.log('passing through token validation');
    const token = req.cookies?.access_token
    winston.debug(req.cookies)
    if( !token ) return res.status(401).json({ message : 'Missing Token'})
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, token_data) => {
        if( err ) return res.status(403).json({ message : 'Unauthorized: access token verification failed' });
        req.token_data = token_data
        next();
    })
}

export function refreshToken(req, res, next) {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;
    if ( !refreshToken || (accessToken && !is_token_expiring_soon(jwt.decode(accessToken).exp)) ) return next();
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, async (err, token_data) => {
        if (err) return res.status(403).json({ message: 'Unauthorized: refresh token verification failed' });
        const user = await User.findById( token_data.user_id )
        if(!user) return res.status(403).json({ message: 'Unauthorized: user in token not found' });
        const newAccessToken = jwt.sign(
            { user_id: user._id, username : user.username, email : user.email }, 
            process.env.JWT_ACCESS_TOKEN, 
            { expiresIn: '15m' }
        );
        res.cookie('access_token', newAccessToken, { httpOnly: true, secure: process.env.ENVIRONMENT === 'PROD' });
        next();
    });
}