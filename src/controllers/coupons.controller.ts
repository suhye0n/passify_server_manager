import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateCouponDto } from '@dtos/coupons.dto';
import { Coupon } from '@interfaces/coupons.interface';
import { CouponService } from '@services/coupons.service';

export class CouponController {
  private couponService = Container.get(CouponService);

  public getCoupons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const coupons: Coupon[] = await this.couponService.findAllCoupon();
      res.status(200).json({ data: coupons, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCouponById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const couponId = Number(req.params.id);
      const coupon: Coupon = await this.couponService.findCouponById(couponId);
      res.status(200).json({ data: coupon, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const couponData: CreateCouponDto = req.body;
      const newCoupon: Coupon = await this.couponService.createCoupon(couponData);
      res.status(201).json({ data: newCoupon, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const couponId = Number(req.params.id);
      const couponData: CreateCouponDto = req.body;
      const updatedCoupon: Coupon = await this.couponService.updateCoupon(couponId, couponData);
      res.status(200).json({ data: updatedCoupon, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const couponId = Number(req.params.id);
      const deletedCoupon: Coupon = await this.couponService.deleteCoupon(couponId);
      res.status(200).json({ data: deletedCoupon, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
