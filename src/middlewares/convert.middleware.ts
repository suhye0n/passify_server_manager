import { Request, Response, NextFunction } from 'express';

export const convertFormData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.userId) {
    req.body.userId = parseInt(req.body.userId, 10);
  }

  if (req.body.type) {
    req.body.type = req.body.type.toUpperCase();
  }

  next();
};
