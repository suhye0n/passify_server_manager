export enum PassType {
  COUPON = 'COUPON',
  CARD = 'CARD',
  POINT = 'POINT',
  MEMBERSHIP = 'MEMBERSHIP',
}

export interface Pass {
  id?: number;
  userId: number;
  titleId?: number; // TODO: 필수값으로 변경
  name?: string; // TODO: 삭제
  barcode: string;
  memo?: string;
  tagId?: number;
  type: PassType;
}
