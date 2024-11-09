import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';

export class UserController {
  private userService = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { offset = 0, limit = 10, fromAt, toAt, ...query } = req.query;
      const fromDate = fromAt ? new Date(fromAt as string) : undefined;
      const toDate = toAt ? new Date(toAt as string) : undefined;

      const { users, count } = await this.userService.findAllUser(Number(offset), Number(limit), query, fromDate, toDate);
      res.status(200).json({ count, data: users, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const user: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: user, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const newUser: User = await this.userService.createUser(userData);
      res.status(201).json({ data: newUser, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updatedUser: User = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updatedUser, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deletedUser: User = await this.userService.deleteUser(userId);
      res.status(200).json({ data: deletedUser, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
