// src/users/dto/create-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class CreateAgentDto {

    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    prenom: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    teleph: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsEnum(['super-admin', 'admin', 'manager', 'agent'], {
        message: 'type must be one of: super-admin, admin, manager, agent',
    })
    type: string;

    @IsMongoId()
    @IsNotEmpty()
    role: string; // MongoDB ObjectId string for Role reference

    @IsMongoId()
    @IsOptional()
    forms: string[];

    @IsNotEmpty()
    departementId:string;
}

export class UpdateAgentDto extends PartialType(CreateAgentDto) {}
