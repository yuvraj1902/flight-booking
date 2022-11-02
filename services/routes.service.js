const db=require("../connection")


const createRoute=(data,callBack)=>{
    
db.query("insert into routes(source,destination,distance) values(?,?,?)",[data.source,data.destination,data.distance],(err,result)=>{
                if(err) return callBack(err,null,500)
                else return callBack(null,result,201)
            })
}


const getRoute=(callBack)=>{
    db.query("select * from routes",(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

const deleteRoute=(data,callBack)=>{
    db.query("delete from routes where id=?",[data.id],(err,result)=>{
        
        if(err) return callBack(err,null,500)
        return callBack(null,result,200)
    })

} 

module.exports={createRoute,getRoute,deleteRoute}