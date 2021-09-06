import { Router } from 'express';

import authRoutes from './auth/routes';
import deliveryRoutes from './delivery/routes';
import orderRoute from './orders/routes';
import productsRoutes from './products/routes';

//init components routes
export function registerApiRoutes(router: Router, prefix: String): void {
	router.use(`${prefix}/auth`, authRoutes);
	router.use(`${prefix}/delivery`, deliveryRoutes);
	router.use(`${prefix}/orders`, orderRoute);
	router.use(`${prefix}/products`, productsRoutes);
}
