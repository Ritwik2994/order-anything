import express from 'express';
import http from 'http';
import mongoose from 'mongoose'

// Set env variables from .env file
import { config } from 'dotenv';
config();

import 'module-alias/register';
import { logger } from '@utils';
import { Server } from './api/server'


(async function main() {
	try {
		//assigning port
		const PORT = process.env.PORT || 5000;

		//assigning database uri
		const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernauth'

		// Database Connection
		logger.info('Initializing Database connection...');
		const connection = await mongoose.connect(MONGODB_URI, {
		})
		.then(() => logger.info('DATABASE IS CONNECTED'))
		.catch(err => logger.error('DATABASE CONNECTION ERROR: ', err))

		//initialising express server
		// middleware + routes were implicitely integrated 
		const app: express.Application = new Server().app
		const httpServer = http.createServer(app);


		// Starting the express server
		httpServer.listen(PORT);

		httpServer.on('listening', () => {
			logger.info(`node server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
		});

		//when server close then it will also close DB connection
		httpServer.on('close', () => {
			connection.close()
		    logger.info('node server closed')
		})
	} catch (err) {
		logger.error(err);
	}
})();
