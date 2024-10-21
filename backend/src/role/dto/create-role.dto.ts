// src/roles/dtos/create-role.dto.ts
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsArray()
  @IsOptional()
  readonly permissions?: Types.ObjectId[];
}
