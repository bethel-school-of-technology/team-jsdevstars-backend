import { NextFunction, Request, Response, Router } from 'express'

const router = Router()

function welcomeGreeting(req: Request, res: Response, next: NextFunction) {
  res.send('Hello user! Welcome to my site.')
}

router.get('/', welcomeGreeting)

export default router
