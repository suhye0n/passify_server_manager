import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreatePassDto, UpdatePassDto } from '@dtos/passes.dto';
import { Pass } from '@interfaces/passes.interface';
import { PassService } from '@services/passes.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class PassController {
  private passService = Container.get(PassService);

  public getPasses = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { offset = 0, limit = 10, fromAt, toAt, ...query } = req.query;
      const fromDate = fromAt ? new Date(fromAt as string) : undefined;
      const toDate = toAt ? new Date(toAt as string) : undefined;
      const userId = req.user.id;

      const { passes, count } = await this.passService.findAllPass(userId, Number(offset), Number(limit), query, fromDate, toDate);
      res.status(200).json({ count, data: passes, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPassById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const passId = Number(req.params.id);
      const pass: Pass = await this.passService.findPassById(passId);
      res.status(200).json({ data: pass, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPass = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const passData: CreatePassDto = req.body;
      const userId = req.user.id;

      const newPass: Pass = await this.passService.createPass(userId, passData);
      res.status(201).json({ data: newPass, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const passId = Number(req.params.id);
      const passData: UpdatePassDto = req.body;
      const updatedPass: Pass = await this.passService.updatePass(passId, passData);
      res.status(200).json({ data: updatedPass, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const passId = Number(req.params.id);
      const deletedPass: Pass = await this.passService.deletePass(passId);
      res.status(200).json({ data: deletedPass, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
