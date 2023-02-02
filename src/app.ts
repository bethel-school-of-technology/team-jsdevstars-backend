import morgan from "morgan";
import express, { NextFunction, Request, Response } from 'express'
import { db } from './models';
import articleRoutes from './routes/articleRoutes'
// import articleCommentRoutes from './routes/articleCommentRoutes'
import forumRoutes from './routes/forumRoutes'
// import forumCommentRoutes from './routes/forumCommentRoutes'
import userRoutes from './routes/userRoutes'


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors')
app.use(cors())

// routes
app.use('/api/articles', articleRoutes);
// app.use('/api/articles', articleCommentRoutes)
app.use('/api/forum', forumRoutes);
// app.use('/api/forum', forumCommentRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(405).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);