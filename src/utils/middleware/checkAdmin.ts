import { Response, Request, NextFunction } from 'express';
import { UnauthorizedError } from '@errors';

export default function (req: Request, res: Response, next: NextFunction) {
	const currentUser = res.locals.user;

	if (!currentUser) {
		return next({ status: 401, message: UnauthorizedError });
	}

	if (currentUser.role === 'admin') {
		return next();
	}

	return next({ status: 401, message: UnauthorizedError });
}
