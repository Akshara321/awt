var fs=require('fs')
var http=require('http')
var url=require('url')

let result;
function write(result){
    fs.writeFile('student.json',JSON.stringify(result),function(err){
        console.log(err)
    })
}

const server=http.createServer(function(req,res){
    if(req.url=='/'){
        res.write("<h1>welcome to student data page</h1>")
        res.end()
    }
    if(req.url=='/getdata'&&req.method=='GET'){
        fs.readFile('student.json',function(err,data){
            res.write(data)
            res.end()
        })
    }
if(req.method=='POST'){
    const newstd=url.parse(req.url,true).query;
    console.log(newstd)
    fs.readFile('student.json',function(err,data){
        result=JSON.parse(data)
        let index=result.length
        result[index]=newstd
        console.log(result)
        write(result)
        res.write("<h1>Student data inserted</h1>")
        res.end();
    })



}

if(req.method=="PUT"){
    const upstd=url.parse(req.url,true).query
    fs.readFile('student.json',function(err,data){
        result=JSON.parse(data)
        for(i in result){
            if(upstd['id']==result[i]['id']){
                result[i]['id']=upstd['id']
                result[i]['name']=upstd['name']
                result[i]['branch']=upstd['branch']
write(result);
res.write("updated")
res.end();

            }
        }
    })
}


if(req.method=="DELETE"){



    const delstd=url.parse(req.url,true).query
    fs.readFile('student.json',function(err,data){
        result=JSON.parse(data)
        for(i in result){
            if(delstd['id']==result[i]['id']){
                result.splice(i,1)
                write(result)
                res.write("deleted")
                res.end()
            }
        }
    })
}
})


server.listen(2003,()=>console.log('server started'))




