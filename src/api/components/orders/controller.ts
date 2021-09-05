import Order from './model'
import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
} from '@errors'


// --------------------- create new order ---------------------------------

export async function createNewOrder(req: Request, res: Response, next: NextFunction) {
  try {
    let { productName, address, quantity } = req.body;




    // create new product
    const createOrder = new Order({
        productName,
        address,
        quantity
    });


    const order = await createOrder.save();

    res.status(200).json({
      type: "success",
      message: "Order is created",
      data: {
        orderId: order._id,
      },
    });

  } catch (error) {
    next(error);
  }
};

// --------------- fetch current order -------------------------

export async function fetchCurrentOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const currentOrder = res.locals.order;
  
  
      return res.status(200).json({
        type: "success",
        message: "fetch current order",
        data: {
          user:currentorder,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  



