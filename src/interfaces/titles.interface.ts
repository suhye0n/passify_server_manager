import { CouponType } from '@interfaces/coupons.interface';

export interface Title {
  id?: number;
  userId?: number;
  name: string;
  type: CouponType;
  icon?: string;
}
