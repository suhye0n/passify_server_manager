import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateTitleDto, UpdateTitleDto } from '@dtos/titles.dto';
import { Title } from '@interfaces/titles.interface';
import { TitleService } from '@services/titles.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class TitleController {
  private titleService = Container.get(TitleService);

  public getTitles = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { offset = 0, limit = 10, fromAt, toAt, ...query } = req.query;
      const fromDate = fromAt ? new Date(fromAt as string) : undefined;
      const toDate = toAt ? new Date(toAt as string) : undefined;
      const userId = req.user.id;

      const { titles, count } = await this.titleService.findAllTitle(userId, Number(offset), Number(limit), query, fromDate, toDate);
      res.status(200).json({ count, data: titles, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTitleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const titleId = Number(req.params.id);
      const title: Title = await this.titleService.findTitleById(titleId);
      res.status(200).json({ data: title, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTitle = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const titleData: CreateTitleDto = req.body;
      const icon = req.file ? `/uploads/icons/${req.file.filename}` : null;
      const userId = req.user.id;
      const newTitle: Title = await this.titleService.createTitle(userId, { ...titleData, icon });
      res.status(201).json({ data: newTitle, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTitle = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const titleId = Number(req.params.id);
      const icon = req.file ? `/uploads/icons/${req.file.filename}` : null;

      const titleData: UpdateTitleDto = req.body;
      const userId = req.user.id;

      const updatedTitle: Title = await this.titleService.updateTitle(userId, titleId, { ...titleData, icon });
      res.status(200).json({ data: updatedTitle, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTitle = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const titleId = Number(req.params.id);
      const userId = req.user.id;

      const deletedTitle: Title = await this.titleService.deleteTitle(userId, titleId);
      res.status(200).json({ data: deletedTitle, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
