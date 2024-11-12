import 'reflect-metadata';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { DB } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

export class App {
  public app: express.Application;
  public environment: string;
  public serverPort: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.environment = NODE_ENV || 'development';
    this.serverPort = PORT || 3000;

    this.setupDatabaseConnection();
    this.applyMiddlewares();
    this.configureRoutes(routes);
    this.handleErrors();
  }

  public start() {
    this.app.listen(this.serverPort, () => {
      logger.info('-----------------------------------');
      logger.info(`App is running in ${this.environment} mode.`);
      logger.info(`Server is listening on port ${this.serverPort}`);
      logger.info('-----------------------------------');
    });
  }

  public getAppInstance() {
    return this.app;
  }

  private async setupDatabaseConnection() {
    try {
      await DB.sequelize.sync({ alter: true });
      logger.info('Database connection established successfully.');
    } catch (error) {
      logger.error('Failed to connect to the database.', error);
    }
  }

  private applyMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private configureRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private handleErrors() {
    this.app.use(ErrorMiddleware);
  }
}
