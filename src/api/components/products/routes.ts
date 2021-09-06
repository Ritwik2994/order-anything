import { Router } from 'express';
import { body } from 'express-validator';
import { fetchaAllProducts, createNewProduct, fetchaProductById, updateProduct, deleteProduct } from './controller';

const router: Router = Router();

router.get('/view', fetchaAllProducts);

router.post('/new', createNewProduct);

router.get('/view/:id', fetchaProductById);

router.put('/view/:id', updateProduct);

router.delete('/view/', deleteProduct);

export default router;
