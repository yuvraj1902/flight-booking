const db=require("../connection")


const createCoupon=(data,callBack)=>{
    
db.query("insert into coupons(code,discountPercentage) values(?,?)",[data.code,data.discountPercentage],(err,result)=>{
                if(err) return callBack(err,null,500)
                else return callBack(null,result,201)
            })
}


const getCoupon=(callBack)=>{
    db.query("select * from coupons",(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

const deleteCoupon=(data,callBack)=>{
    db.query("delete from coupons where id=?",[data.id],(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

module.exports={createCoupon,getCoupon,deleteCoupon}