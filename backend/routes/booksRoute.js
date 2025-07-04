import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

//Route to save a new book
router.post('/',async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send('Send all required field');
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
})
//get all books from mongodb
router.get('/', async (req,res)=> {
    try{
        const books = await Book.find({});
        
        return res.status(200).json({
            count: books.length,
            data:books
        }
        );
    }catch(err){
        console.log(err.message)
    }
})
//get one book by id with mongoose
router.get('/:id', async (req,res)=> {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch(err){
        console.log(err.message);
        
    }
})
//update a book with mongoose
router.put('/:id', async(req, res)=> {
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'All the fields are required ! '
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result){
            return res.status(404).json({message:'Book not found'})
        }
        return res.status(200).send({ message: 'Book updated successfully' });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});const { id } = req.params;


    }
})
//delete a book
router.delete('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book is deleted successfully !'});
    }catch(err){
        console.log(err.message)
        res.status(500).send({message : error.message})
    }
});

export default router;