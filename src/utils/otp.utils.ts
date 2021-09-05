import { NextFunction } from 'express'
import fast2sms from 'fast-two-sms'
import {FAST2SMS} from '../config'

export function generateOTP (otp_length) {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export async function fast2sms({ message, contactNumber }, next: NextFunction) {
  try {
    const res = await fast2sms.sendMessage({
      authorization: FAST2SMS,
      message,
      numbers: [contactNumber],
    });
    console.log(res);
  } catch (error) {
    next(error);
  }
};