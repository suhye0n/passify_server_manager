export enum CouponType {
  COUPON = 'COUPON',
  CARD = 'CARD',
  POINT = 'POINT',
}

export interface Coupon {
  id?: number;
  userId: number;
  titleId?: number; // TODO: 필수값으로 변경
  name?: string; // TODO: 삭제
  barcode: string;
  memo?: string;
  tagId?: number;
  type: CouponType;
}
