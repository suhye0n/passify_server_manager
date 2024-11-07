import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(32)
  public password?: string;
}
