import express from "express";
import cors from "cors";
// import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
dotenv.config();

const app=express();
const port=process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public");
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const upload=multer({storage:storage}).single("file");

let filePath;
app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err)
        {
            res.status(500).json(err);
        }
        filePath=req.file.path;
    });
});


app.listen(port,()=>{
    console.log(`Server is running ${port}!`);
});