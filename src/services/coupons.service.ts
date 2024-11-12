import { Service } from 'typedi';
import { DB } from '@database';
import { CreateCouponDto, UpdateCouponDto } from '@dtos/coupons.dto';
import { HttpException } from '@/exceptions/httpException';
import { Coupon } from '@interfaces/coupons.interface';
import { Op } from 'sequelize';

@Service()
export class CouponService {
  public async findAllCoupon(
    userId: number,
    offset: number,
    limit: number,
    query: { [key: string]: any },
    fromDate?: Date,
    toDate?: Date,
  ): Promise<{ coupons: Coupon[]; count: number }> {
    const whereOptions: any = { userId };
    const modelAttributes = Object.keys(DB.Coupons.rawAttributes);

    for (const [key, value] of Object.entries(query)) {
      if (modelAttributes.includes(key) && value !== '' && key !== 'isDeleted') {
        if (key === 'id') {
          whereOptions[key] = Number(value);
        } else {
          whereOptions[key] = {
            [Op.like]: `%${value}%`,
          };
        }
      }
    }

    if (fromDate && toDate) {
      whereOptions.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
    } else if (fromDate) {
      whereOptions.createdAt = {
        [Op.gte]: fromDate,
      };
    } else if (toDate) {
      whereOptions.createdAt = {
        [Op.lte]: toDate,
      };
    }

    const { rows: coupons, count } = await DB.Coupons.findAndCountAll({
      where: whereOptions,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return { coupons, count };
  }

  public async findCouponById(couponId: number): Promise<Coupon> {
    const coupon: Coupon = await DB.Coupons.findByPk(couponId);
    if (!coupon) throw new HttpException(409, "Coupon doesn't exist");

    return coupon;
  }

  public async createCoupon(couponData: CreateCouponDto): Promise<Coupon> {
    const existingCoupon: Coupon = await DB.Coupons.findOne({
      where: { barcode: couponData.barcode, userId: couponData.userId, type: couponData.type },
    });
    if (existingCoupon) throw new HttpException(409, `This barcode ${couponData.barcode} already exists`);

    const newCoupon: Coupon = await DB.Coupons.create(couponData);
    return newCoupon;
  }

  public async updateCoupon(couponId: number, couponData: UpdateCouponDto): Promise<Coupon> {
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
