import User from '../../api/components/auth/model'
import { Response, Request, NextFunction } from 'express'

import { BadRequestError,  CustomError, NotFoundError } from '@errors'
import { verifyJwtToken } from '@utils'




export default async function(req: Request, res: Response, next: NextFunction) {
    try {
        // check for auth header from client 
        const header = req.headers.authorization

        if (!header) {
            next({ status: 403, message: BadRequestError })
            return
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]

        if (!token) {
            next({ status: 403, message: BadRequestError })
            return
        }

        const userId = verifyJwtToken(token,next)

        if (!userId) {
            next({ status: 403, message: CustomError })
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            next({status: 404, message: NotFoundError })
            return
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}