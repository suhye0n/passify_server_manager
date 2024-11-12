import { Router } from 'express';
import { TagController } from '@controllers/tags.controller';
import { CreateTagDto } from '@dtos/tags.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class TagRoute implements Routes {
  public path = '/tags';
  public router = Router();
  public tag = new TagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.tag.getTags);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.tag.getTagById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTagDto), this.tag.createTag);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateTagDto, true), this.tag.updateTag);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.tag.deleteTag);
  }
}
