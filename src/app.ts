import 'reflect-metadata';
import 'express-async-errors';
import '@app/container';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';

import routes from '@app/routes';
import AppError from '@app/errors/AppError';
import appConfig from '@app/config/app';

class App {
  IN_PRODUCTION: boolean;

  public server: express.Application;

  public constructor() {
    this.IN_PRODUCTION = appConfig.environment === 'production';
    this.server = express();
    this.middlewares();
    this.database();
    this.routes();
    this.errorHandler();
  }

  private errorHandler(): void {
    this.server.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
          });
        }
        return response.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      },
    );
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private async database(): Promise<void> {
    try {
      const connection = await createConnection();
      connection.runMigrations();
    } catch (error) {
      console.error('Erro ao conectar com banco de dados', error);
    }
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
