import Delivery from './model';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@errors';

// --------------------- create delivery ---------------------------------

export async function createNewDelivery(req: Request, res: Response, next: NextFunction) {
	try {
		let { productName, address, quantity, status } = req.body;

		// create new product
		const createOrder = new Delivery({
			productName,
			address,
			quantity,
			status
		});

		const delivery = await createDeliveryr.save();

		res.status(200).json({
			type: 'success',
			message: 'delivery is created',
			status: 'ONWAY',
			data: {
				orderId: delivery._id
			}
		});
	} catch (error) {
		next(error);
	}
}
