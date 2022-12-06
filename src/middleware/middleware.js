const jwt = require('jsonwebtoken');

const BooksModel= require("../models/booksModel");

const authenticate = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(token, "Secret-Key-lithium", function (err, decode) {
          if (err) { return res.status(401).send({ status: false, data: "Authentication failed" }) }
          req.decode = decode;
         return  next();
      })

    }
    catch (error) {
        res.status(500).send({ staus: false, msg: error.message });
    }
}


const authorize= async function ( req, res, next) {
    try{

      let bookId= req.params.bookId
      let gettingUserId= await BooksModel.findOne({_id:bookId})
     let userId= gettingUserId.userId.toString()

    if (userId  == req.decode.userId || req.body.userId  == req.decode.userId  ) return next();
      else return res.status(403).send({ status: false, msg: "you are not authorised" });

    }catch(error){
      return res.status(500).send({msg: error.message})
    }
  }


module.exports.authenticate=authenticate;
module.exports.authorize = authorize