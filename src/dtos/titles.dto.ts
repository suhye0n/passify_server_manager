import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CouponType } from '@interfaces/coupons.interface';

export class CreateTitleDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsEnum(CouponType)
  public type: CouponType;

  @IsOptional()
  @IsString()
  public icon?: string;
}

export class UpdateTitleDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsEnum(CouponType)
  public type?: CouponType;

  @IsOptional()
  @IsString()
  public icon?: string;
}
