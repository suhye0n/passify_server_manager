import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CouponType } from '@interfaces/coupons.interface';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsInt()
  public userId: number;

  @IsOptional() // TODO: 필수값으로 변경
  @IsString()
  public titleId?: string;

  @IsNotEmpty()
  @IsString()
  public name: string; // TODO: 삭제

  @IsNotEmpty()
  @IsString()
  public barcode: string;

  @IsOptional()
  @IsString()
  public memo?: string;

  @IsOptional()
  @IsInt()
  public tagId?: number;

  @IsNotEmpty()
  @IsEnum(CouponType)
  public type: CouponType;
}

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  public titleId?: string;

  @IsOptional()
  @IsString()
  public name?: string; // TODO: 삭제

  @IsOptional()
  @IsString()
  public barcode?: string;

  @IsOptional()
  @IsString()
  public memo?: string;

  @IsOptional()
  @IsInt()
  public tagId?: number;

  @IsOptional()
  @IsEnum(CouponType)
  public type?: CouponType;
}
