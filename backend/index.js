import express from "express";
import {PORT, MongoDBURL} from "./config.js"; 
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware to hanle cors policy
//option1 : allow all origins with default of cors
app.use(cors());

//option2 : allow custom origins (better)
/*
app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))
*/

//create the http request
app.get('/', (req,res)=> {
    return res.status(234).send("Welcoome to mern stack dev");

});

//middle ware
//in each request we use /books
app.use('/books', booksRoute);

mongoose.connect(MongoDBURL)
    .then(()=> {
        app.listen(PORT, () => {
            console.log('App is connected to database');
            app.listen(PORT, ()=> {
                console.log(`App is listening to port : ${PORT}`);
            });
        })
    })
    .catch((err)=> {
        console.log(err)
    })

