import express, { Application, urlencoded } from 'express';
import { connectDatabase } from './infra/database';
import { errorMiddleware } from './middlewares/error.middlewares';
import { EventRoutes } from './routes/event.routes';

class App {
   public app: Application;
   private eventRoutes = new EventRoutes();

   constructor() {
      this.app = express();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.interceptErrors();
      connectDatabase();
   }

   private initializeRoutes() {
      this.app.use('/events', this.eventRoutes.router);
   }

   private interceptErrors() {
      this.app.use(errorMiddleware);
   }

   private initializeMiddlewares() {
      this.app.use(express.json());
      this.app.use(urlencoded({ extended: true }))
   }

   listen() {
      this.app.listen(3333, () => console.log('server is running'));
   }
}

export { App };