const {createUser,getUser,checkUser}=require("../services/user.service")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const db = require("../connection")
    const createUsers=(req,res)=>{
        createUser(req.body,(err,result,resp)=>{
            if(err) return res.status(resp).json({error:err})
            else return res.status(resp).json({
                message:result
            })
        })
    }

const getUsers=(req,res)=>{
    
    getUser((err,result,resp)=>{
        if(err) return res.status(resp).json({
            error:err
        })
            return res.status(resp).json(result)
    })
} 

// const checkUsers=(req,res)=>{
//     checkUser(req.body,(err,result,resp)=>{
//         if(err) return res.status(resp).json({
//             error:err
//         })
//         const obj={
//             email:req.body.email,
//             password:req.body.password
//         }
        
//         console.log(result);

//         let validate_password = bcrypt.compareSync(req.body.password,result[0].password);
//         if(validate_password){
//         const token=jwt.sign(obj,'secret');
//         res.cookie("token",token)
//         return res.status(resp).json({
//             message:result,
//             token:token
//         })
//     }
//     })
// }

const checkUsers = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == "" || password == "") {
        return res.status(400).json({
            message: "please enter all the required fields"
        });
    }

    try {
        db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    return res.status(404).json({
                        message: "user not found"
                    });
                }
                console.log(result[0].password)
                const obj={
                    email:email,
                    password:result[0].password
                   }
                let verify_pass = bcrypt.compareSync(password, result[0].password);
                if (verify_pass) {
                   
                    const token = jwt.sign(obj, 'secret');
                    res.cookie("token", token, { expire: new Date() + 100000 });
                    return res.status(200).json({
                        message: "login successfully",
                        token: token
                    });
                }
                else {
                    return res.status(400).json({
                        message: "incorrect password"
                    });
                }
            }
            else{
            res.status(500).json({
                message: "internal server error"
            })
        }
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Erroggvr");
    }

}

    module.exports={createUsers,getUsers,checkUsers}
