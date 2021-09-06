import { Router } from 'express';
import { body } from 'express-validator';
import { fetchCurrentOrder, createNewOrder, getMyOrders, getLoggedinUser } from './controller';

const router: Router = Router();

router.get('/view', fetchCurrentOrder);

router.post('/new', createNewOrder);

router.get('/all', getMyOrders);

router.get('/loggedin', getLoggedinUser);

export default router;
