const jwt = require('jsonwebtoken');

//middleware function to protect the routes we want to protect
//we just have to put this function auth on any route we want to protect
module.exports = function (req,res,next){
    //get token from header
    const token = req.header('auth-token');
    //check if it hasn´t a token
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}