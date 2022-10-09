const jwt = require('jsonwebtoken');
const logger = require('../services/logger');


module.exports =  function (req,res, next) {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).send("Access Denied");
    console.log(token);
    console.log(authHeader);
    console.log("____________");
    console.log(process.env.SECRET_TOKEN);
    try {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user)=>{
            if(err) return res.status(403).send("Access Denied. Invalid Token");
            req.user = user;
            next();
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send("Invalid Token")
    }
}

