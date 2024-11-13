import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  public name?: string;
}
