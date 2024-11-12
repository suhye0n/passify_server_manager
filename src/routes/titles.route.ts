import { Router } from 'express';
import { TitleController } from '@controllers/titles.controller';
import { CreateTitleDto, UpdateTitleDto } from '@dtos/titles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { upload } from '@/config/multer.config';
import { convertFormData } from '@middlewares/convert.middleware';

export class TitleRoute implements Routes {
  public path = '/titles';
  public router = Router();
  public title = new TitleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.title.getTitles);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.title.getTitleById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      upload.single('icon'),
      convertFormData,
      ValidationMiddleware(CreateTitleDto),
      this.title.createTitle,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      AuthMiddleware,
      upload.single('icon'),
      convertFormData,
      ValidationMiddleware(UpdateTitleDto, true),
      this.title.updateTitle,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.title.deleteTitle);
  }
}
