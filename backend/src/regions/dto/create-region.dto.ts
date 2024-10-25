// src/regions/dto/create-region.dto.ts
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    adresse: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    telph: string; 

    @IsNotEmpty()
    @IsEnum(['active', 'inactive'])
    status: string;

    @IsNotEmpty()
    managerId:string;
}
