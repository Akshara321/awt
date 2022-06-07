var express=require('express')
var app=express()
var fs=require('fs')
app.use(express.json())


app.get('/staff',function(req,res){
    fs.readFile('faculty.json',function(err,data){
        res.send(data)
    })
})

app.post('/addstaff',function(req,res){
    console.log(req.body)
    const newstf={
        id:req.body.id,
        name:req.body.name,
        dept:req.body.dept
    }
    fs.readFile('faculty.json',function(err,data){
        var sdata=JSON.parse(data)
        sdata.push(newstf)
        fs.writeFile('faculty.json',JSON.stringify(sdata),function(err,data){
            console.log('data inserted')
        })
    })

    res.send("Data inserted")
})



app.put('/updatestaff/:id',function(req,res){
    var id=req.body.id
    fs.readFile('faculty.json',function(err,data){
        var sdata=JSON.parse(data)
        for(i in sdata){
            if(id==sdata[i]['id']){
                sdata[i]['id']=req.body.id
                sdata[i]['name']=req.body.name
                sdata[i]['dept']=req.body.dept

                fs.writeFile('faculty.json',JSON.stringify(sdata),function(err,data){
                    console.log('data updated')
                })

            }
        }
res.send("data updated")

})
})


app.delete('/delstaff/:id',function(req,res){
var id=req.body.id
fs.readFile('faculty.json',function(err,data){
    var sdata=JSON.parse(data)
for(i in sdata){
    if(id==sdata[i]['id']){
        sdata.splice(i,1)
        fs.writeFile('faculty.json',JSON.stringify(sdata),function(err,data){
            console.log('data deleted')
        })
    }
}
res.send('Data is deleted')
})

})


app.listen(1202,()=>console.log("server started..."))



