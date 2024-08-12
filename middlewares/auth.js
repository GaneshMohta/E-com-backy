const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    if(!req.header("Authorization")){
        return res.status(401).json({error :"No token"})
    }

    const token = req.header("Authorization").split(" ")[1];

if(!token){
    return res.status(401).json({error : "No token ,authorization denied"});
}
try {
    const decoded = jwt.verify(token, "qw234asd");
    req.user = decoded ;
    next();
} catch (err){
    res.status(401).json({error : "Token is not valid"});
}
};

module.exports =auth;
