import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
// import postRoutes from "./routes/postRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
// import { app, server } from "./socket/socket.wjs";

dotenv.config();

const app = express();
const port = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.use(bodyParser.json({ limit: '15mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
// Middleware
app.use(express.json()); // Parse JSON data in req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data in req.body
app.use(cookieParser()); // Invoke cookieParser as a function to set it up as middleware
app.use(cors())

// Database sconnection  
connectDB();


// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
