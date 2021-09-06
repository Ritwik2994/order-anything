import Product from './model'
import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
} from '@errors'


// --------------------- create new product ---------------------------------

export async function createNewProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = new Product({
      name: 'Sample name',
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      status: 'ACTIVE',
      description: 'Sample description',
      address: 'abc'
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    next(error);
  }
};




// --------------- fetch all products -------------------------

export async function fetchaAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
     const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  } catch (error) {
    next(error);
  }
};

// --------------- Fetch single product -------------------------

export async function fetchaProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error);
  }
};


// --------------- update a product -------------------------

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      description,
      image,
      brand,
      category,
      status,
      address,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.status = status
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.address = address
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error);
  }
};


// --------------- Delete a product -------------------------

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error);
  }
};