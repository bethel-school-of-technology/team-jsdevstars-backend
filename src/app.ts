import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { db } from './models'
import tweetRoutes from './routes/tweetRoutes'
import userRoutes from './routes/userRoutes'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3001'],
}
app.use(cors(corsOptions))

//routes
app.use('/api/tweets', tweetRoutes)
app.use('/api/users', userRoutes)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(405).end()
})

// syncing our database
db.sync()
  .then(() => console.log('Database synced!'))
  .catch((err: Error) => console.log('Error syncing database'))

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
