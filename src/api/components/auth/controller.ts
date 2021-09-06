import User from './model';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError, UnauthorizedError, NotFoundError, CustomError } from '@errors';

import { createJwtToken } from '@utils';

import { generateOTP, fast2sms } from '@utils';

// --------------------- create new user ---------------------------------

export async function createNewUser(req: Request, res: Response, next: NextFunction) {
	try {
		let { phone, name } = req.body;

		// check duplicate phone Number
		const phoneExist = await User.findOne({ phone });

		if (phoneExist) {
			next({ status: 400, message: 'user exist' });
			return;
		}

		// create new user
		const createUser = new User({
			phone,
			name,
			role: phone === process.env.ADMIN_PHONE ? 'ADMIN' : 'USER'
		});

		// save user

		const user = await createUser.save();

		res.status(200).json({
			type: 'success',
			message: 'Account created OTP sended to mobile number',
			data: {
				userId: user._id
			}
		});

		// generate otp
		const otp = generateOTP(6);
		// save otp to user collection
		user.phoneOtp = otp;
		await user.save();
		// send otp to phone number
		await fast2sms(
			{
				message: `Your OTP is ${otp}`,
				contactNumber: user.phone
			},
			next
		);
	} catch (error) {
		next(error);
	}
}

// ------------ login with phone otp ----------------------------------

export async function loginWithPhoneOtp(req: Request, res: Response, next: NextFunction) {
	try {
		const { phone } = req.body;
		const user = await User.findOne({ phone });

		if (!user) {
			next({ status: 400, message: 'phone number noit found error' });
			return;
		}

		res.status(201).json({
			type: 'success',
			message: 'OTP sended to your registered phone number',
			data: {
				userId: user._id
			}
		});

		// generate otp
		const otp = generateOTP(6);
		// save otp to user collection
		user.phoneOtp = otp;
		user.isAccountVerified = true;
		await user.save();
		// send otp to phone number
		await fast2sms(
			{
				message: `Your OTP is ${otp}`,
				contactNumber: user.phone
			},
			next
		);
	} catch (error) {
		next(error);
	}
}

// ---------------------- verify phone otp -------------------------

export async function verifyPhoneOtp(req: Request, res: Response, next: NextFunction) {
	try {
		const { otp, userId } = req.body;
		const user = await User.findById(userId);
		if (!user) {
			next({ status: 400, message: UnauthorizedError });
			return;
		}

		if (user.phoneOtp !== otp) {
			next({ status: 400, message: 'INCORRECT_OTP_ERR' });
			return;
		}
		const token = createJwtToken({ userId: user._id });

		user.phoneOtp = '';
		await user.save();

		res.status(201).json({
			type: 'success',
			message: 'OTP verified successfully',
			data: {
				token,
				userId: user._id
			}
		});
	} catch (error) {
		next(error);
	}
}

// --------------- fetch current user -------------------------

export async function fetchCurrentUser(req: Request, res: Response, next: NextFunction) {
	try {
		const currentUser = res.locals.user;

		return res.status(200).json({
			type: 'success',
			message: 'fetch current user',
			data: {
				user: currentUser
			}
		});
	} catch (error) {
		next(error);
	}
}

// --------------- admin access only -------------------------

export async function handleAdmin(req: Request, res: Response, next: NextFunction) {
	try {
		const currentUser = res.locals.user;

		return res.status(200).json({
			type: 'success',
			message: 'Okay you are admin!!',
			data: {
				user: currentUser
			}
		});
	} catch (error) {
		next(error);
	}
}
