import jwt from 'jsonwebtoken';

function is_token_expiring_soon( exp ){
    const current_time = Math.floor(Date.now() / 1000)
    const buffer_time = process.env.TOKEN_BUFFER_TIME_MINUTES * 60
    return ( exp - current_time ) <= buffer_time
}

export function verifyToken(req, res, next){
    if(process.env.ENVIRONMENT !== 'PROD') console.log('passing through token validation');
    const token = req.cookies?.access_token
    if( !token ) return res.status(401).json({ message : 'Missing Token'})
    console.log(token)
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, token_data) => {
        if( err ) return res.status(403).json({ message : 'Unauthorized :-'})
        res.token_data = token_data
        next();
    })
}

export function refreshToken(req, res, next) {
    if (process.env.ENVIRONMENT !== 'PROD') console.log('passing through token refresh');
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;
    if ( (accessToken && !is_token_expiring_soon(jwt.decode(accessToken).exp)) || !refreshToken ) return next();
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, token_data) => {
        if (err) return res.status(403).json({ message: 'Unauthorized --' });
        const newAccessToken = jwt.sign(
            { id: token_data.id, role: token_data.role }, 
            process.env.JWT_ACCESS_TOKEN, 
            { expiresIn: '15m' }
        );
        res.cookie('access_token', newAccessToken, { httpOnly: true, secure: process.env.ENVIRONMENT === 'PROD' });
        res.token_data = token_data;
        next();
    });
}