import pkg from 'jsonwebtoken';
const { verify } = pkg;
const adminKey = 'sEc@e2T';

const adminAuthenticateJwt = (req, res, next)=>
{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(' ')[1];
        verify(token, adminKey, (err, user)=>
        {
            if(err)
            {
                res.sendStatus(403);
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
    adminAuthenticateJwt, adminKey
}