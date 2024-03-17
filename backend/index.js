import express from 'express';
import mongoose from 'mongoose';
import {PORT, mongodbURL} from './config.js';
import router from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
// cach 1: allow all origins with default of cors
app.use(cors());

// cach 2: allow custom origins
// app.use(cors(
//     {
//         origin: 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));


app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to MERN stack tutorial.');
});

app.use('/books', router);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('Connected database');

        app.listen(PORT, () => {
            console.log(`App is running at ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });