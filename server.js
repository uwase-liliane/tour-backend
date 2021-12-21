import express from "express";
import bodyParser from "body-Parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes";
import tourRouter from "./src/routes/tourRoutes";

dotenv.config("./env");

const app =express();

app.use(bodyParser.json());
app.use("/user",userRouter)
app.use("/tour",tourRouter)

app.use("/",(req,res)=> res.status(200).json({
    message:"This is tour APi"
}))
const dbUrl=process.env.DATABASEURL;
const port = process.env.PORT;
mongoose.connect(dbUrl).then (()=>console.log("database connect succesfully"))
app.listen(3030,()=>{
    console.log(`server is running on port ${port}`)
    
})
export default app
