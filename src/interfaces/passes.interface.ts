export enum PassType {
  COUPON = 'COUPON',
  CARD = 'CARD',
  POINT = 'POINT',
  MEMBERSHIP = 'MEMBERSHIP',
}

export interface Pass {
  id?: number;
  userId: number;
  titleId: number;
  barcode: string;
  memo?: string;
  tagId?: number;
  type: PassType;
}
