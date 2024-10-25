import { IsNotEmpty, IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFormulaireDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  nameOfValues: string[]; // Array of value names

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  units: string[]; // Array of unit measurements

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}

export class UpdateFormulaireDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  nameOfValues?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  units?: string[];

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  createdBy: string;
}
