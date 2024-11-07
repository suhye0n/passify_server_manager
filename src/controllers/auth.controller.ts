import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  private authService = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newUser: CreateUserDto = req.body;
      const { cookie, user } = await this.authService.signup(newUser);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: user, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentials: CreateUserDto = req.body;
      const { cookie, user } = await this.authService.login(credentials);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: user, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currentUser: User = req.user;
      const loggedOutUser: User = await this.authService.logout(currentUser);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: loggedOutUser, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
