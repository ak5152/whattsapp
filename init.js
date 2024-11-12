const mongoose = require("mongoose");
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');}

 Chat.insertMany([
    {
        from:"neha",
        to:"priya",
        msg:"send me your exam sheets",
        created_at:new Date(),
    },
    {
        from:"rohit",
        to:"mohit",
        msg:"send me your holiday hw",
        created_at:new Date(),
    },
    {
        from:"ronika",
        to:"piyush",
        msg:"i hate you",
        created_at:new Date(),
    },
    {
        from:"akshar",
        to:"ayush",
        msg:"send me your cricket ground",
        created_at:new Date(),
    }
 ]).then((data)=>{
    console.log(data);
 })   