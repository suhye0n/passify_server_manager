import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PassType } from '@interfaces/passes.interface';

export class CreatePassDto {
  @IsNotEmpty()
  @IsInt()
  public titleId: number;

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
  @IsEnum(PassType)
  public type: PassType;
}

export class UpdatePassDto {
  @IsOptional()
  @IsInt()
  public titleId?: number;

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
  @IsEnum(PassType)
  public type?: PassType;
}
