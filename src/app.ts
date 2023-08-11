import express, { Application, urlencoded } from 'express';
import { connectDatabase } from './infra/database';
import { errorMiddleware } from './middlewares/error.middlewares';

class App {
   public app: Application;

   constructor() {
      this.app = express();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.interceptErrors();
      connectDatabase();
   }

   initializeRoutes() {
      // this.app.use('/');
   }

   interceptErrors() {
      this.app.use(errorMiddleware);
   }

   initializeMiddlewares() {
      this.app.use(express.json());
      this.app.use(urlencoded({ extended: true }))
   }

   listen() {
      this.app.listen(3333, () => console.log('server is running'));
   }
}

export { App };