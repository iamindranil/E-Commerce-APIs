const express=require('express');
const { connect } = require('./config/dbConnect');
const app=express();
const dotenv=require('dotenv').config();
const authRouter=require('./routes/authRoute');
const bodyParser = require('body-parser');
const PORT=process.env.PORT||4000;
connect();  

app.use(bodyParser.json());
app.use("/api/user",authRouter);
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
