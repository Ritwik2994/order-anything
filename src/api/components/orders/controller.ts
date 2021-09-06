import Order from './model'
import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
} from '@errors'


// --------------------- create new order ---------------------------------

export async function createNewOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }

  } catch (error) {
    next(error);
  }
};

// --------------- fetch order -------------------------

export async function fetchCurrentOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
      )
    
      if (order) {
        res.json(order)
      } else {
        res.status(404)
        throw new Error('Order not found')
      }
    } catch (error) {
      next(error);
    }
  };
  

  // --------------- get loggedin user -------------------------

export async function getLoggedinUser (req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await Order.find({ user: req.user._id })
  res.json(orders)
  } catch (error) {
    next(error);
  }
};


  // --------------- get all order -------------------------

  export async function getMyOrders (req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.find({}).populate('user', 'id name')
      res.json(orders)
    } catch (error) {
      next(error);
    }
  };
  


