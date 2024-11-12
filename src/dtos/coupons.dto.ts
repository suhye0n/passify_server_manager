import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsInt, IsOptional } from 'class-validator';

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
}
