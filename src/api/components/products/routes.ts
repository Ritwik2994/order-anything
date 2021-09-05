import { Router } from 'express';
import { body } from 'express-validator';
import {  fetchaAllProducts, createNewProduct } from './controller'

const router: Router = Router();



router.get('/view', fetchaAllProducts)

router.post('/new', createNewProduct);


export default router;
