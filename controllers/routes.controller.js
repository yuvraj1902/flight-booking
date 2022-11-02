const {createRoute,getRoute,deleteRoute}=require("../services/routes.service")

const db = require("../connection")


const createRoutes=(req,res)=>{
    createRoute(req.body,(err,result,resp)=>{
        if(err) return res.status(resp).json({error:err})
        else return res.status(resp).json({
            message:result
        })
    })
}

const getRoutes=(req,res)=>{
    getRoute((err,result,resp)=>{
    if(err) return res.status(resp).json({
        error:err
    })
        return res.status(resp).json(result)
})
} 


const deleteRoutes=(req,res)=>{
deleteRoute(req.query,(err,result,resp)=>{
    if(err) return res.status(resp).json({
        error:err
    })
        return res.status(resp).json(result)
})
} 



module.exports={createRoutes,getRoutes,deleteRoutes}