const express = require('express')
const dotenv = require('dotenv')
const mongoConnect = require("./connect")
dotenv.config()

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoConnect(process.env.MONGO_URL).then(()=>{
    console.log("connection successfull!!");
}).catch((err)=>{
    console.log(err);
})

app.use("/",(req,res)=>{
    res.send("hlo from backend")
})

app.listen(process.env.PORT,()=>{
    console.log(`SERVER listens at port ${process.env.PORT}`);
})

