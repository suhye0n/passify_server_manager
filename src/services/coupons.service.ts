import { Service } from 'typedi';
import { DB } from '@database';
import { CreateCouponDto } from '@dtos/coupons.dto';
import { HttpException } from '@/exceptions/httpException';
import { Coupon } from '@interfaces/coupons.interface';

@Service()
export class CouponService {
  public async findAllCoupon(userId: number): Promise<Coupon[]> {
    const coupons: Coupon[] = await DB.Coupons.findAll({
      where: {
        userId: userId,
      },
    });
    return coupons;
  }

  public async findCouponById(couponId: number): Promise<Coupon> {
    const coupon: Coupon = await DB.Coupons.findByPk(couponId);
    if (!coupon) throw new HttpException(409, "Coupon doesn't exist");

    return coupon;
  }

  public async createCoupon(couponData: CreateCouponDto): Promise<Coupon> {
    const existingCoupon: Coupon = await DB.Coupons.findOne({
      where: { barcode: couponData.barcode, userId: couponData.userId },
    });
    if (existingCoupon) throw new HttpException(409, `This barcode ${couponData.barcode} already exists`);

    const newCoupon: Coupon = await DB.Coupons.create(couponData);
    return newCoupon;
  }

  public async updateCoupon(couponId: number, couponData: CreateCouponDto): Promise<Coupon> {
    const couponToUpdate: Coupon = await DB.Coupons.findByPk(couponId);
    if (!couponToUpdate) throw new HttpException(409, "Coupon doesn't exist");

    await DB.Coupons.update(couponData, { where: { id: couponId } });

    const updatedCoupon: Coupon = await DB.Coupons.findByPk(couponId);
    return updatedCoupon;
  }

  public async deleteCoupon(couponId: number): Promise<Coupon> {
    const couponToDelete: Coupon = await DB.Coupons.findByPk(couponId);
    if (!couponToDelete) throw new HttpException(409, "Coupon doesn't exist");

    await DB.Coupons.destroy({ where: { id: couponId } });

    return couponToDelete;
  }
}
