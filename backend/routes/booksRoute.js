import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// save book
router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: 'Send all required fields: title, author, publishYear'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

// get all book
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

// get one book by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

// update book by id
router.put('/:id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({message: "Fill all required fields: title, author, publishYear."});
        }
        const { id } = req.params;
        const updateBook = await Book.findByIdAndUpdate(id, req.body);
        if(!updateBook) {
            return res.status(404).json({message: 'Book is not found.'});
        }
        return res.status(200).json({message: 'Book is updated successfully.'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

// delete book by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateBook = await Book.findByIdAndDelete(id);
        if(!updateBook) {
            return res.status(404).json({message: 'Book is not found.'});
        }
        return res.status(200).json({message: "Delete book successfully."});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

export default router;