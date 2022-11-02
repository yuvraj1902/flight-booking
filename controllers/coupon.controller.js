const {createCoupon,getCoupon,deleteCoupon}=require("../services/coupon.service")

const db = require("../connection")


const createCoupons=(req,res)=>{
    createCoupon(req.body,(err,result,resp)=>{
        if(err) return res.status(resp).json({error:err})
        else return res.status(resp).json({
            message:result
        })
    })
}

const getCoupons=(req,res)=>{
    getCoupon((err,result,resp)=>{
    if(err) return res.status(resp).json({
        error:err
    })
        return res.status(resp).json(result)
})
} 


const deleteCoupons=(req,res)=>{
deleteCoupon(req.query,(err,result,resp)=>{
    if(err) return res.status(resp).json({
        error:err
    })
        return res.status(resp).json(result)
})
} 



module.exports={createCoupons,getCoupons,deleteCoupons}