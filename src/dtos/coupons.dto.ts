import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CouponType } from '@interfaces/coupons.interface';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsInt()
  public userId: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

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
  public name?: string;

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
