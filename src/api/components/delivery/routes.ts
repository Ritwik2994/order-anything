import { Router } from 'express';
import { body } from 'express-validator';
import { status, createNewDelivery } from './controller'

const router: Router = Router();



router.get('/status', currentStatus)

router.post('/new', createNewDelivery);


export default router;
