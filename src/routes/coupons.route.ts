import { Router } from 'express';
import { CouponController } from '@controllers/coupons.controller';
import { CreateCouponDto } from '@dtos/coupons.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class CouponRoute implements Routes {
  public path = '/coupons';
  public router = Router();
  public coupon = new CouponController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.coupon.getCoupons);
    this.router.get(`${this.path}/:id(\\d+)`, this.coupon.getCouponById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateCouponDto), this.coupon.createCoupon);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateCouponDto, true), this.coupon.updateCoupon);
    this.router.delete(`${this.path}/:id(\\d+)`, this.coupon.deleteCoupon);
  }
}
