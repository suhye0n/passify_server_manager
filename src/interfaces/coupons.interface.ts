export enum CouponType {
  COUPON = 'COUPON',
  CARD = 'CARD',
}

export interface Coupon {
  id?: number;
  userId: number;
  name: string;
  barcode: string;
  memo?: string;
  tagId?: number;
  type: CouponType;
}
