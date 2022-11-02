const admin={
    email:"yuvi@gmail.com",
    password:"yuvi"
}
const db=require('../connection')
const isAdmin=(req,res,next)=>{
    console.log(req.auth)
    db.query("select email,password from user where email=? and password=?",[req.auth.email,req.auth.password],(err,result)=>{
        if(err) {
            return res.status(500).json({
            error:"Intenal server error"
        })
    }
    console.log(result[0].email,result[0].password,admin.email,admin.password)
    if(result[0].email == admin.email && result[0].password==admin.password)  {
        next()
    }
    return res.status(403).json({
        error:"Not an Admin"
    })
        
    
    })
}

module.exports=isAdmin