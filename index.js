const express=require("express");
const app=express();

const mongoose = require("mongoose");
let path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));


main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');}

    //index route
    app.get("/chats",async(req,res)=>{
        let chats=await Chat.find();
        // console.log(chats);
        res.render("index.ejs",{chats});
    })

    const chat1=new Chat({
        from:"neha",
        to:"priya",
        msg:"send me your exam sheets",
        created_at:new Date(),
    });
    chat1.save().then((res)=>{
        console.log(res);
    })


app.get("/",(req,res)=>{
    res.send("root is working");
})
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new");
})

//create route
app.post("/chats",(req,res)=>{
    let{from,msg,to}=req.body;
    let newchat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });

    newchat.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");

})
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true},{new:true});
    console.log(updatedchat);
    res.redirect("/chats");
})
//DESTROY ROUTE
app.delete("/chats/:id",(req,res)=>{
    
    let {id}=req.params;
    let deletedchat=Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
})

app.listen(8080,()=>{
    console.log("app is listening port");
})