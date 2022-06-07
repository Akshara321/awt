var express=require('express')
var jwt=require('jsonwebtoken')
var app=express()
app.get('/api',(req,res)=>{
    res.json({
        message:"WElcome to api"
    })
})

app.post('/api/posts',verifyToken,(req,res)=>
{
    jwt.verify(req.token,"secretkey",(err,authdata)=>{
        if(err){res.sendStatus(403)}
        else{
            res.json({message:"POst created...",authdata
        })
        }
    })
})

app.post('/api/login',(req,res)=>{
    const user={
        id:1,name:"ak",email:"ak@gmail.com"
    }

    jwt.sign({user},"secretkey",(err,token)=>{
        res.json({token})
    })
})


function verifyToken(req,res,next){
    const bh=req.headers['authorization']
    if(typeof bh!=='undefined'){
        const bt=bh[1]
        req.token=bt
        next()
    }
    else{
        res.sendStatus(403)
    }
}

app.listen(1202,()=>console.log('server started...'))
