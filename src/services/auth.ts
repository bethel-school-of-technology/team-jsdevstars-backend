import bcrypt from 'bcrypt'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

const secret = 'Dads are the best!'

export const hashPassword = async (plainTextPassword: string) => {
  const saltRound = 12
  const hash = await bcrypt.hash(plainTextPassword, saltRound)
  return hash
}

export const comparePasswords = async (
  plainTextPassword: string,
  hashPassword: string
) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashPassword)
        } catch (error) {
        console.log(error);
        throw new Error("Error occured while comparing password");
        }
        
}

export const signUserToken = async (user: User) => {
    try {
        let token = jwt.sign(
        {userId: user.userId},
        secret,
        {expiresIn: '5hr'}
        );
        return token;
        } catch (error) {
        console.log(error);
        throw new Error("Error occured while signing token");
        }
}

export const verifyUser = async (req: Request) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      let decoded: any = jwt.verify(token, secret)
      return User.findByPk(decoded.userId)
    } catch (err) {
      console.log(err)
      throw new Error('Error occured while verifying token')
    }
  } else {
    return null
  }
}
