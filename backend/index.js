const express = require('express')
const dotenv = require('dotenv')
const mongoConnect = require("./connect")
dotenv.config()

const cors = require('cors')
const app = express()
const userRoutes = require('./Routes/User');
const courseRoutes = require('./Routes/Course');
const enrollmentRoutes = require("./Routes/Enrollment");
const reviewRoutes = require("./Routes/Review");
const checkAuth = require('./Middlewares/checkAuth');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// here i defined the user credentials 
app.use('/cred',userRoutes);

// here i defined the Course Routes like CRUD operations for the course Routes
app.use('/course',checkAuth,courseRoutes);

// here i define the enrollment routes 
app.use('/enroll',checkAuth,enrollmentRoutes);

//here i define the reviews

app.use("/review",checkAuth , reviewRoutes);

// mongo connection , i always used to create a separate file for this and send the data which results me a promise
mongoConnect(process.env.MONGO_URL).then(()=>{
    console.log("connection successfull!!");
}).catch((err)=>{
    console.log(err);
})

// actually app listens at server 3000 
app.listen(process.env.PORT,()=>{
    console.log(`SERVER listens at port ${process.env.PORT}`);
})

