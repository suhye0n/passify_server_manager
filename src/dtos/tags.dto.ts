import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsInt()
  public userId: number;

  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  public name?: string;
}
