module.exports = function(req, res, next) {
   const jwt = require('jsonwebtoken');
   const {authorization} = req.headers;
   const token = authorization && authorization.split(" ")[1];
   if(token){
       jwt.verify(token, process.env.SECRET_SYSKEY, function(err, decoded){
           if(!err && decoded) {
               req.user = decoded; 
               next();
               return;
           }
           res.sendStatus(401)
       })
   } else res.sendStatus(401)
}