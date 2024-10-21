// src/users/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';

export class CreateUserDto {
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
}
