import { Router } from 'express';
import { body } from 'express-validator';
import { fetchCurrentOrder, createNewOrder } from './controller'

const router: Router = Router();



router.get('/view', fetchCurrentOrder)

router.post('/new', createNewOrder);


export default router;
