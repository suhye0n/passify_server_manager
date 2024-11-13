import { Router } from 'express';
import { PassController } from '@controllers/passes.controller';
import { CreatePassDto, UpdatePassDto } from '@dtos/passes.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class PassRoute implements Routes {
  public path = '/passes';
  public router = Router();
  public pass = new PassController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.pass.getPasses);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.pass.getPassById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreatePassDto), this.pass.createPass);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(UpdatePassDto, true), this.pass.updatePass);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.pass.deletePass);
  }
}
