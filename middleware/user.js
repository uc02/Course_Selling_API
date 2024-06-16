const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function userMiddleware(req, res, next){

  const token = req.headers.authorization;

  const words = token.split(" ");
  const jwtToken = words[1];
  const decodedValue = jwt.verify(jwtToken, JWT_SECRET)

  if(decodedValue.username){
    req.username = decodedValue.username
    next();
  }else{
    res.status(403).json({
      msg: "you are not autheticated"
    })
  }
}

module.exports = userMiddleware;