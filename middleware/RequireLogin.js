
const JWT_SECRET = require("../config/keys")
const jwt =  require("jsonwebtoken")

const UserModel = require("../models/user");


const RequireLogin=(req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization){
        return res.status(401).json({errr:"You must be logged in first"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(error,payload)=>{
        if(error){
        return res.status(401).json({errr:"You must be logged in first"})
        }
        const {_id}= payload
        UserModel.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}

module.exports= RequireLogin