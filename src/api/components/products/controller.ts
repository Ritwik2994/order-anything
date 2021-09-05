import Product from './model'
import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
} from '@errors'


// --------------------- create new product ---------------------------------

export async function createNewProduct(req: Request, res: Response, next: NextFunction) {
  try {
    let { productName, address, } = req.body;


    // check duplicate products
    const productExist = await Product.findOne({ productName });

    if (productExist) {
      next({ status: 400, message: 'Product exist' });
      return;
    }


    // create new product
    const createProduct = new Product({
        productName,
        address,
    });

    // save product

    const product = await createProduct.save();

    res.status(200).json({
      type: "success",
      message: "Product is created",
      data: {
        productId: product._id,
      },
    });

  } catch (error) {
    next(error);
  }
};




// --------------- fetch all products -------------------------

export async function fetchaAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const allProducts = res.product;


    return res.status(200).json({
      type: "success",
      message: "fetch all products",
      data: {
        user:allProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- admin access only -------------------------

