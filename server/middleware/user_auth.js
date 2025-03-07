import pkg from 'jsonwebtoken';
const { verify } = pkg;
const userKey = 'Sec$e1t';

const userAuthenticateJwt = (req, res, next)=>
{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(' ')[1];
        verify(token, userKey, (err, user)=>
        {
            if(err)
            {
                return res.sendStatus(430);
            }
            req.user = user;
            next();
        });
    }
    else
    {
        res.sendStatus(401);
    }
}

export default
{
    userKey, userAuthenticateJwt
}