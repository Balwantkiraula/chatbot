import express from 'express';
const app = express();
import mongoose from 'mongoose';
import chatbotRoutes from './Routes/chatbot.route.js';
import dotenv from 'dotenv';
import cors from "cors"


dotenv.config();    
const port = process.env.PORT ||3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

//Database Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

//define routes
app.use('/api/chatbot/', chatbotRoutes);

app.listen(port, () => {

    console.log(`Server is Running on port ${port}`);
    
}); 

export default app;