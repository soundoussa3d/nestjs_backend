// src/departement/dto/create-departement.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartementDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}