const Express=require("express")
const Mongoose=require("mongoose")
const BodyParser=require("body-parser")
const { use } = require("express/lib/application")

var app=Express()
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

    var receipeModel=Mongoose.model("recepies",
    new Mongoose.Schema(
        {
            title:String,
            category:String,
            description:String,
            preparedby:String
        }
    )
    
    )

    Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/receipeDB")

    app.post("/api/addreceipe",(req,res)=>{
        var data=req.body
        let ob=new receipeModel(data)
        ob.save(
            (error,data)=>{
                if(error){
                    res.send({"status":"error"})
                }
                else{
                    res.send({"status":"success","data":data})
                }
            }
        )
    })

    app.get("/api/recview",(req,res)=>{
        receipeModel.find((error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
            }
        })
    })

    app.post("/api/search",(req,res)=>{
        var getTitle=req.body
        receipeModel.find(getTitle,(error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }
        })
    })

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    receipeModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send({"status":"success"})
        }
    })
})

    app.listen(4008,(req,res)=>{
        console.log("server running")
    })
