import morgan from "morgan";
import express, { NextFunction, Request, Response } from 'express'
import { db } from './models';


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors')
app.use(cors())

// routes
// app.use('/api/tweets', tweetRoutes);
// app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(405).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);