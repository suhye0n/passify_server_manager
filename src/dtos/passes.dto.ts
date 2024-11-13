import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PassType } from '@interfaces/passes.interface';

export class CreatePassDto {
  @IsOptional() // TODO: 필수값으로 변경
  @IsInt()
  public titleId?: number;

  @IsOptional()
  @IsString()
  public name?: string; // TODO: 삭제

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
  @IsEnum(PassType)
  public type?: PassType;
}
