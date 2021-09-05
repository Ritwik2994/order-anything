import jwt from 'jsonwebtoken'
import { JWT_DECODE_ERR } from '@errors'
import { JWT_SECRET } from '../config'
import { NextFunction } from 'express'

export function createJwtToken (payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  return token;
};

export function verifyJwtToken (token, next: NextFunction) {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  } catch (err) {
    next(err);
  }
};