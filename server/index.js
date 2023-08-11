 import express from "express";
 import dotenv from "dotenv";
 import cors from "cors";
 import connect  from "./db.js";
 import  userRoutes  from "./routes/users.js";
 import authRoutes from "./routes/auth.js";
 const app=express();
dotenv.config();


// middlewares
app.use(express.json);
app.use(cors());

// routes
app.use("/api/users" , userRoutes);
app.use("/api/auth",authRoutes);

app.listen(8080 ,() =>{ 
    connect()
    console.log("backend connected");
})