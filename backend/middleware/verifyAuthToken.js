const jwt = require('jsonwebtoken');

const verifyIsLoggedIn = (req, res, next) => {
  // next();
  // return //to do remove
  try{
    const token = req.cookies.access_token;
    if(!token){
      return res.status(403).send("A token is required for authentication");
    }

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    }catch(error){
      next(error);
    }

  }catch(error){
    next(error);
  }
};

const verifyIsAdmin = (req, res, next) => {
  // next();
  // return //to do remove
  if(req.user && req.user.isAdmin){
    next();
  }
  else{
    return res.status(401).send("Unauthorized. Admin required");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };