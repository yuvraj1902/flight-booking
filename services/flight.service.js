const db=require("../connection")


const createFlight=(data,callBack)=>{
    
db.query("insert into flights(name,capacity,status,routeId) values(?,?,?,?)",[data.name,data.capacity,data.status,data.routeId],(err,result)=>{
                if(err) return callBack(err,null,500)
                else return callBack(null,result,201)
            })
}


const getFlight=(callBack)=>{
    db.query("select * from flights",(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

const deleteFlight=(data,callBack)=>{
    db.query("delete from flights where id=?",[data.id],(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

module.exports={createFlight,getFlight,deleteFlight}