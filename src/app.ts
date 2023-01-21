import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import mysql from 'mysql'

let dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'dadsDB',
})

dbConnection.connect(function (err: any) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
})

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3001'],
}
app.use(cors(corsOptions))

// api.use for routes go here.

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end()
})

const port = 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
