import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PassType } from '@interfaces/passes.interface';

export class CreateTitleDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsEnum(PassType)
  public type: PassType;

  @IsOptional()
  @IsString()
  public icon?: string;
}

export class UpdateTitleDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsEnum(PassType)
  public type?: PassType;

  @IsOptional()
  @IsString()
  public icon?: string;
}
